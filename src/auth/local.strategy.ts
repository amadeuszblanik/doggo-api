import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { User } from '../data/user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  userEmailVerificationEnabled: boolean;

  constructor(private authService: AuthService, private configService: ConfigService, private userService: UserService) {
    super();

    this.userEmailVerificationEnabled = this.configService.get('USER_EMAIL_VERIFICATION_ENABLED');
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Cannot validate user');
    }

    if (this.userEmailVerificationEnabled && !user.isEmailVerified) {
      await this.userService.sendUserEmailConfirmation(user);
      throw new ForbiddenException('You need to confirm your email address first. Please check your email inbox.');
    }

    return user;
  }
}
