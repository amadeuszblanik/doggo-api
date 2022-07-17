import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetBreed } from './petBreed.entity';
import { PetBreedDbService } from './petBreed.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetBreed])],
  providers: [PetBreedDbService],
  exports: [PetBreedDbService],
})
export class PetBreedDbModule {}
