import { ConflictException, Injectable } from '@nestjs/common';
import { PetWeightDbService } from '../data/petWeight/petWeight.service';
import { UsersDbService } from '../data/user/users.service';
import { PetDbService } from '../data/pet/pet.service';
import { PetWeightCreateDto } from '../dto/pet-weight-create.dto';
import { WeightUnits } from '../types/weight-units.types';
import { convertWeight } from '../utils';

@Injectable()
export class PetWeightService {
  constructor(private userDbService: UsersDbService, private petDbService: PetDbService, private petWeightDbService: PetWeightDbService) {}

  async createNew(petId: string, payload: PetWeightCreateDto, userId: string): Promise<boolean> {
    const addedBy = await this.userDbService.findById(userId);
    const pet = await this.petDbService.findById(petId, userId);

    if (!pet) {
      throw new ConflictException('Selected pet not exists');
    }

    await this.petWeightDbService.add({
      addedBy,
      pet,
      date: payload.date,
      unit: payload.unit,
      weight: payload.weight,
    });

    return true;
  }

  async getAllByPetId(petId: string, unit: WeightUnits) {
    const petWeights = await this.petWeightDbService.findByPetId(petId);

    return petWeights.map((petWeight) => ({ ...petWeight, weight: convertWeight(petWeight.weight, WeightUnits.Gram, unit), unit }));
  }

  deleteById(weightId: number, petId: string) {
    return this.petWeightDbService.remove(weightId, petId);
  }
}
