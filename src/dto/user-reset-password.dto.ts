import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { PASSWORD_MAX_CHARS, PASSWORD_MIN_CHARS } from '../config';
import { MESSAGES, REGEX } from '../app.utils';

export class UserResetPasswordDto {
  @ApiProperty({
    description: 'New password',
    example: 'Passw0rd!1',
  })
  @IsNotEmpty()
  @Length(PASSWORD_MIN_CHARS, PASSWORD_MAX_CHARS)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({
    description: 'New password confirmation',
    example: 'Passw0rd!1',
  })
  @IsNotEmpty()
  passwordConfirm: string;
}
