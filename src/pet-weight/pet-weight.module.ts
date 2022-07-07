import { Module } from '@nestjs/common';
import { PetWeightService } from './pet-weight.service';
import { PetWeightDbModule } from '../data/petWeight/petWeight.module';
import { PetDbModule } from '../data/pet/pet.module';
import { UsersDbModule } from '../data/user/users.module';

@Module({
  imports: [PetWeightDbModule, PetDbModule, UsersDbModule],
  providers: [PetWeightService],
  exports: [PetWeightService],
})
export class PetWeightModule {}
