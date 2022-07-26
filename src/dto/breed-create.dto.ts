import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class BreedCreateDto {
  @ApiProperty({
    description: 'Breed name',
    example: 'Standard Schnauzer',
  })
  @IsNotEmpty()
  name: string | null;

  @ApiProperty({
    description: 'Breed group',
    example: 'Pinscher and Schnauzer',
  })
  group: string | null;

  @ApiProperty({
    description: 'Breed section',
    example: 'Pinscher and Schnauzer type',
  })
  section: string | null;

  @ApiProperty({
    description: 'Breed provisional',
    example: '',
  })
  provisional: string | null;

  @ApiProperty({
    description: 'Breed country',
    example: 'Germany',
  })
  country: string | null;

  @ApiProperty({
    description: 'Breed url',
    example: 'http://www.fci.be/en/nomenclature/SCHNAUZER-182.html',
  })
  @IsUrl()
  url: string | null;

  @ApiProperty({
    description: 'Breed image',
    example: 'http://www.fci.be/Nomenclature/Illustrations/182g02.jpg',
  })
  @IsUrl()
  image: string | null;

  @ApiProperty({
    description: 'Breed pdf',
    example: 'http://www.fci.be/Nomenclature/Standards/182g02-en.pdf',
  })
  @IsUrl()
  pdf: string | null;
}
