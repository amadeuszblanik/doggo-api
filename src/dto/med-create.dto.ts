import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MedCreateDto {
  @ApiProperty({
    description: 'Med name',
    example: 'Bravecto',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Taken date',
    example: new Date(),
  })
  @IsNotEmpty()
  takenDate: Date;

  @ApiProperty({
    description: 'Valid until date',
    example: null,
  })
  validDate: Date | null;

  @ApiProperty({
    description: 'Some description',
    example: 'Protection against ticks',
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
