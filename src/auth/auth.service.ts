import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<{ userId: number; username: string } | null> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { userId, username } = user;
      return { userId, username };
    }
    return null;
  }
}
