import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetUsers } from './petUsers.entity';
import { PetUsersDbService } from './petUsers.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetUsers])],
  providers: [PetUsersDbService],
  exports: [PetUsersDbService],
})
export class PetUsersDbModule {}
