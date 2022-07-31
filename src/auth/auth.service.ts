import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../data/user/user.entity';
import { UsersDbService } from '../data/user/users.service';
import { JwtPayload } from '../types/jwt-payload.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersDbService: UsersDbService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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

  login(user: User, keepMeSignedIn: boolean) {
    const payload: JwtPayload = { username: user.email, userid: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_USER_AUTHENTICATION_TOKEN_SECRET'),
        expiresIn: keepMeSignedIn
          ? this.configService.get('JWT_USER_AUTHENTICATION_TOKEN_EXPIRATION_EXTENDED_TIME')
          : this.configService.get('JWT_USER_AUTHENTICATION_TOKEN_EXPIRATION_TIME'),
      }),
    };
  }
}
