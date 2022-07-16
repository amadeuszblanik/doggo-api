import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './breed.entity';
import { BreedDbService } from './breed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Breed])],
  providers: [BreedDbService],
  exports: [BreedDbService],
})
export class BreedDbModule {}
