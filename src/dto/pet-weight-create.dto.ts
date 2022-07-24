import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PetWeightCreateDto {
  @ApiProperty({
    description: 'Weight',
    example: 9.85,
  })
  @IsNotEmpty()
  weight: number;

  @ApiProperty({
    description: 'Date',
    example: new Date(),
  })
  date: Date;
}
