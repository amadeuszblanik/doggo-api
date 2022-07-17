import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Pet } from './pet.entity';
import { PetDbService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), ConfigModule],
  providers: [PetDbService],
  exports: [PetDbService],
})
export class PetDbModule {}
