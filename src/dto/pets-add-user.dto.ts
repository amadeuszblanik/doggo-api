import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PetsRoles } from '../types/pets-roles.types';

export class PetsAddUserDto {
  @ApiProperty({
    description: 'Pet id',
    example: 0,
  })
  @IsNotEmpty()
  petId: number;

  @ApiProperty({
    description: 'User e-mail',
    example: 'joe.doe@doggo.rocks',
  })
  userEmail: string;

  @ApiProperty({
    description: 'User role in pet',
    example: PetsRoles.Mate,
  })
  role: PetsRoles;
}
