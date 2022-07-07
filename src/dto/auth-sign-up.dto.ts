import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from '../app.utils';
import { PASSWORD_MAX_CHARS, PASSWORD_MIN_CHARS } from '../config';
import { WeightUnits } from '../types/weight-units.types';

export class AuthSignUpDto {
  @ApiProperty({
    description: 'User e-mail',
    example: 'joe.doe@doggo.rocks',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Joe',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'User secret password',
    example: 'Passw0rd!1',
  })
  @IsNotEmpty()
  @Length(PASSWORD_MIN_CHARS, PASSWORD_MAX_CHARS)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({
    description: 'Confirmation of the user secret password',
    example: 'Passw0rd!1',
  })
  @IsNotEmpty()
  @Length(PASSWORD_MIN_CHARS, PASSWORD_MAX_CHARS)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  passwordConfirm: string;

  @ApiProperty({
    description: 'Preferred unit weight',
    example: WeightUnits.Kilogram,
  })
  weightUnit?: WeightUnits;
}
