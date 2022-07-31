import { Module } from '@nestjs/common';
import { MedService } from './med.service';
import { MedDbModule } from '../data/med/med.module';
import { PetDbModule } from '../data/pet/pet.module';

@Module({
  imports: [PetDbModule, MedDbModule],
  providers: [MedService],
  exports: [MedService],
})
export class MedModule {}
