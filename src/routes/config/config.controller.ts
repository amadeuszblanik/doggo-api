import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { BreedDbService } from '../../data/breed/breed.service';
import { PublicConfigResponse } from '../../types/public-config-response.types';
import { Breed } from '../../data/breed/breed.entity';

@ApiTags('config')
@Controller('config')
export class ConfigController {
  constructor(private breedDbService: BreedDbService) {}

  @Get('')
  async getPublic(): Promise<PublicConfigResponse> {
    const breeds = await this.breedDbService.listAll();

    return { breeds };
  }

  @ApiImplicitQuery({
    name: 'levenshtein',
    description: 'Optional parameter for searching using levenshtein distance. Range from 0 to 1. Where 1 is the exact match.',
    required: false,
    type: Number,
  })
  @Get('breeds')
  getBreeds(@Query('keyword') keyword: string, @Query('levenshtein') levenshtein?: number): Promise<Breed[]> {
    return this.breedDbService.search(keyword, levenshtein);
  }
}
