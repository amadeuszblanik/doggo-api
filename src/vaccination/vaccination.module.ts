import { Module } from '@nestjs/common';
import { VaccinationService } from './vaccination.service';
import { VaccinationDbModule } from '../data/vaccination/vaccination.module';
import { PetDbModule } from '../data/pet/pet.module';

@Module({
  imports: [PetDbModule, VaccinationDbModule],
  providers: [VaccinationService],
  exports: [VaccinationService],
})
export class VaccinationModule {}
