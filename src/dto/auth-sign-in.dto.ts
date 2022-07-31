import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from '../app.utils';
import { PASSWORD_MAX_CHARS, PASSWORD_MIN_CHARS } from '../config';

export class AuthSignInDto {
  @ApiProperty({
    description: 'User e-mail',
    example: 'joe.doe@doggo.rocks',
  })
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({
    description: 'User secret password',
    example: 'Passw0rd!1',
  })
  @IsNotEmpty()
  @Length(PASSWORD_MIN_CHARS, PASSWORD_MAX_CHARS)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({
    description: 'Extend time of single session',
    default: false,
  })
  keepSignIn: boolean;
}
