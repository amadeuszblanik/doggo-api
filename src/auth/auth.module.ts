import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { SuperuserGuard } from './superuser.guard';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UsersDbModule } from '../data/user/users.module';
import { environment } from '../environments/environment';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    UserModule,
    UsersDbModule,
    PassportModule,
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.expiresIn },
    }),
    ConfigModule,
    EmailModule,
  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy, SuperuserGuard],
  exports: [AuthService],
})
export class AuthModule {}
