import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetDbService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  providers: [PetDbService],
  exports: [PetDbService],
})
export class PetDbModule {}
