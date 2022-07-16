import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './userRole.entity';
import { UserRoleDbService } from './userRole.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UserRoleDbService],
  exports: [UserRoleDbService],
})
export class UserRoleDbModule {}
