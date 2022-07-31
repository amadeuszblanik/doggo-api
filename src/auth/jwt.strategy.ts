import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtResponse } from '../types/jwt-response.types';
import { UserRoles } from '../types/user-roles.types';
import { JwtData } from '../types/jwt-data.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: String(configService.get('JWT_USER_AUTHENTICATION_TOKEN_SECRET')),
    });
  }

  async validate(jwtToken: JwtData): Promise<JwtResponse> {
    const { username, userid } = jwtToken;

    const user = await this.userService.getById(userid);
    const role: UserRoles = user.userRole?.role?.name || UserRoles.User;

    if (!user.isEmailVerified) {
      throw new ForbiddenException('You need to confirm your email address first. Please check your email inbox.');
    }

    if (!user.isActive) {
      await this.userService.sendUserEmailConfirmation(user);
      throw new ForbiddenException('Your account was deactivated. Please contact support.');
    }

    if (role === UserRoles.Banned) {
      throw new ForbiddenException('Your account was banned. Please contact support.');
    }

    return { username, userid, weightUnit: user.weightUnit, role };
  }
}
