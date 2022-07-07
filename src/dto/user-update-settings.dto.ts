import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { WeightUnits } from '../types/weight-units.types';

export class UserUpdateSettingsDto {
  @ApiProperty({
    description: 'User first name',
    example: 'Joe',
  })
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsNotEmpty()
  lastName?: string;

  @ApiProperty({
    description: 'Preferred unit weight',
    example: WeightUnits.Kilogram,
  })
  weightUnit?: WeightUnits;
}
