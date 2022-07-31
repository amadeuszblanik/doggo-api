import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Med } from './med.entity';
import { MedDbService } from './med.service';

@Module({
  imports: [TypeOrmModule.forFeature([Med])],
  providers: [MedDbService],
  exports: [MedDbService],
})
export class MedDbModule {}
