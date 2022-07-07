import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { UsersDbModule } from '../data/user/users.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [UsersDbModule, JwtModule, ConfigModule, EmailModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
