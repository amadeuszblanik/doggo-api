import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PetKind } from '../types/pet-kind.types';

export class DiseaseCreateDto {
  @ApiProperty({
    description: 'Diseases name',
    example: 'Rabies',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Pet kind',
    example: PetKind.Dog,
  })
  @IsNotEmpty()
  kind: PetKind;
}
