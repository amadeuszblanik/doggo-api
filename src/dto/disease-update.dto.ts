import { ApiProperty } from '@nestjs/swagger';
import { PetKind } from '../types/pet-kind.types';

export class DiseaseUpdateDto {
  @ApiProperty({
    description: 'Diseases name',
    example: 'Rabies',
  })
  name?: string;

  @ApiProperty({
    description: 'Pet kind',
    example: PetKind.Dog,
  })
  kind?: PetKind;
}
