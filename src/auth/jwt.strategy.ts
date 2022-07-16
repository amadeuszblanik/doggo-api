import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { environment } from '../environments/environment';
import { JwtPayload } from '../types/jwt-payload.types';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.jwt.secret,
    });
  }

  async validate({ username, userid }: JwtPayload) {
    const user = await this.userService.getById(userid);

    if (!user.isEmailVerified) {
      throw new ForbiddenException('You need to confirm your email address first. Please check your email inbox.');
    }

    if (!user.isActive) {
      await this.userService.sendUserEmailConfirmation(user);
      throw new ForbiddenException('Your account was deactivated. Please contact support.');
    }

    return { username, userid };
  }
}
