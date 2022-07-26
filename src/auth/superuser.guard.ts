import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtResponse } from '../types/jwt-response.types';
import { UserRoles } from '../types/user-roles.types';

@Injectable()
export class SuperuserGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: JwtResponse }>();

    return request.user.role === UserRoles.SuperUser;
  }
}
