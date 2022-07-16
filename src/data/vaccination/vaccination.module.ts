import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaccination } from './vaccination.entity';
import { VaccinationDbService } from './vaccination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccination])],
  providers: [VaccinationDbService],
  exports: [VaccinationDbService],
})
export class VaccinationDbModule {}
