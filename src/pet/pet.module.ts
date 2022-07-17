import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetDbModule } from '../data/pet/pet.module';
import { PetUsersDbModule } from '../data/petUsers/petUsers.module';
import { UsersDbModule } from '../data/user/users.module';
import { BreedDbModule } from '../data/breed/breed.module';
import { PetBreedDbModule } from '../data/petBreed/petBreed.module';

@Module({
  imports: [UsersDbModule, PetDbModule, PetUsersDbModule, BreedDbModule, PetBreedDbModule],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
