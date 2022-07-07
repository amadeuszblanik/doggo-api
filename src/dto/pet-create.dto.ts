import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PetKind } from '../types/pet-kind.types';

export class PetCreateDto {
  @ApiProperty({
    description: 'Pet name',
    example: 'Goldie',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Pet breed',
    example: PetKind.Dog,
  })
  kind: PetKind;

  @ApiProperty({
    description: 'Pet breed',
    example: 'Standard Schnauzer',
  })
  breed: string;

  @ApiProperty({
    description: 'Microchip number',
    example: 'XXXXXXXXXXXXXXX',
  })
  microchip: string;

  @ApiProperty({
    description: 'Birth date',
    example: new Date('12-02-2022'),
  })
  birthDate: Date;
}
