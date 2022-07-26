import { ApiProperty } from '@nestjs/swagger';
import { IsDate, MaxDate, MinDate } from 'class-validator';
import { Transform } from 'class-transformer';
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
    description: 'Birth date. Must be between 01-01-1970 and current date',
    example: new Date('12-02-2022'),
  })
  @Transform(({ value }: { value: Date | string }) => new Date(value))
  @IsDate()
  @MaxDate(new Date())
  @MinDate(new Date('01-01-1970'))
  birthDate?: Date;
}
