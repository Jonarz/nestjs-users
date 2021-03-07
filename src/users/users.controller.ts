import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { Public } from 'src/auth/guards/jwt-auth.guard';
import { User } from './entities/User';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('register')
  craeteUser(@Body() user: User) {
    return this.userService.createOne(user);
  }

  @Get(':id')
  findUser(@Param() id: string) {
    return this.userService.findOne(id);
  }
}
