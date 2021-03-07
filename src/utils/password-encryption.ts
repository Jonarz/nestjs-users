import * as bcrypt from 'bcrypt';

export class PasswordEncryption {
  static async encryptPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
