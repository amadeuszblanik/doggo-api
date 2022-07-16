import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VaccinationCreateDto {
  @ApiProperty({
    description: 'Vaccination name',
    example: 'Nobivac L4',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Vaccination date',
    example: new Date(),
  })
  @IsNotEmpty()
  vaccinationDate: Date;

  @ApiProperty({
    description: 'Valid until date',
    example: null,
  })
  validDate: Date | null;

  @ApiProperty({
    description: 'Some description',
    example: 'Rabies',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Send push notification (Planned feature)',
    example: true,
  })
  @IsNotEmpty()
  reminders: boolean;
}
