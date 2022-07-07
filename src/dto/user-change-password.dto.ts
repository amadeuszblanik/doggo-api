import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { PASSWORD_MAX_CHARS, PASSWORD_MIN_CHARS } from '../config';
import { MESSAGES, REGEX } from '../app.utils';

export class UserChangePasswordDto {
  @ApiProperty({
    description: 'Current password',
    example: 'Passw0rd!1',
  })
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'Passw0rd!3',
  })
  @Length(PASSWORD_MIN_CHARS, PASSWORD_MAX_CHARS)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    description: 'New password confrim',
    example: 'Passw0rd!3',
  })
  @IsNotEmpty()
  newPasswordConfrim: string;
}
