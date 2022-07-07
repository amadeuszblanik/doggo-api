import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetDbModule } from '../data/pet/pet.module';
import { PetUsersDbModule } from '../data/petUsers/petUsers.module';
import { UsersDbModule } from '../data/user/users.module';

@Module({
  imports: [UsersDbModule, PetDbModule, PetUsersDbModule],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
