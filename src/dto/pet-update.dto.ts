import { ApiProperty } from '@nestjs/swagger';
import { PetKind } from '../types/pet-kind.types';

export class PetUpdateDto {
  @ApiProperty({
    description: 'Pet name',
    example: 'Goldie',
  })
  name?: string;

  @ApiProperty({
    description: 'Pet breed',
    example: PetKind.Dog,
  })
  kind?: PetKind;

  @ApiProperty({
    description: 'Pet breed ID',
    example: 182,
  })
  breed?: number;

  @ApiProperty({
    description: 'Microchip number',
    example: 'XXXXXXXXXXXXXXX',
  })
  microchip?: string;

  @ApiProperty({
    description: 'Birth date',
    example: new Date('12-02-2022'),
  })
  birthDate?: Date;
}
