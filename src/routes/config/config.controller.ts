import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { BreedDbService } from '../../data/breed/breed.service';
import { PublicConfigResponse } from '../../types/public-config-response.types';
import { Breed } from '../../data/breed/breed.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { JwtResponse } from '../../types/jwt-response.types';
import { PrivateConfigResponse } from '../../types/private-config-response.types';
import { PetService } from '../../pet/pet.service';

@ApiTags('config')
@Controller('config')
export class ConfigController {
  constructor(private petsService: PetService, private breedDbService: BreedDbService) {}

  @Get('')
  async getPublic(): Promise<PublicConfigResponse> {
    const breeds = await this.breedDbService.listAll();

    return { breeds };
  }

  @Get('private')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPrivate(@Request() req: { user: JwtResponse }): Promise<PrivateConfigResponse> {
    const { activePets: userPets, petsLimitPerUser: userPetsAllowed } = await this.petsService.userLimits(req.user.userid);

    return {
      role: req.user.role,
      weightUnits: req.user.weightUnit,
      userPets,
      userPetsAllowed,
      canAddNewPet: userPets < userPetsAllowed,
    };
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
