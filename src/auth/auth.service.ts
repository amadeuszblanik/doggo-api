import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../data/user/user.entity';
import { UsersDbService } from '../data/user/users.service';
import { JwtPayload } from '../types/jwt-payload.types';

@Injectable()
export class AuthService {
  constructor(private usersDbService: UsersDbService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersDbService.findByEmail(email);

    if (!user) {
      throw new ConflictException('This e-mail is not registered in our database. Please create new account.');
    }

    const isVerifiedPassword = await bcrypt.compare(password, user.password);

    if (!isVerifiedPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    return user;
  }

  login(user: User) {
    const payload: JwtPayload = { username: user.email, userid: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
