import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PetsRoles } from '../types/pets-roles.types';

export class PetInviteDto {
  @ApiProperty({
    description: 'Pet id',
    example: 0,
  })
  @IsNotEmpty()
  petId: string;

  @ApiProperty({
    description: 'E-mail of user to invite',
    example: 'joe.doe@doggo.rocks',
  })
  userEmail: string;

  @ApiProperty({
    description: 'Role of new user',
    example: PetsRoles.Mate,
  })
  role: PetsRoles;
}
