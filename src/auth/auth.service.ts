import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user.interface';
import { AccessToken } from './interfaces/accessToken.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<{ userId: number; username: string } | null> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { userId, username } = user;
      return { userId, username };
    }
    return null;
  }

  async login(user: User): Promise<AccessToken> {
    const payload = { username: user.username, sub: user.userId };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
