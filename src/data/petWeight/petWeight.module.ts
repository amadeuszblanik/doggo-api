import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetWeight } from './petWeight.entity';
import { PetWeightDbService } from './petWeight.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetWeight])],
  providers: [PetWeightDbService],
  exports: [PetWeightDbService],
})
export class PetWeightDbModule {}
