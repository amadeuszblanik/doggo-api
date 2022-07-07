import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { WeightUnits } from '../types/weight-units.types';

export class PetWeightCreateDto {
  @ApiProperty({
    description: 'Weight',
    example: 9.85,
  })
  @IsNotEmpty()
  weight: number;

  @ApiProperty({
    description: 'Unit',
    example: WeightUnits.Kilogram,
  })
  unit: WeightUnits;

  @ApiProperty({
    description: 'Date',
    example: new Date(),
  })
  date: Date;
}
