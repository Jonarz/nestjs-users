import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/guards/jwt-auth.guard';
import { Request as ExpressRequest, Router } from 'express';
import { User } from './users/entities/User';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Public()
  @Get('routes')
  root(@Request() req: ExpressRequest) {
    const router = req.app._router as Router;
    return {
      routes: router.stack
        .map((layer) => {
          if (layer.route) {
            const path = layer.route?.path;
            const method = layer.route?.stack[0].method;
            return `${method.toUpperCase()} ${path}`;
          }
        })
        .filter((item) => item !== undefined),
    };
  }
}
