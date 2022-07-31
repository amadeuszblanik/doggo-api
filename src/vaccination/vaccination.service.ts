import { Injectable, NotFoundException } from '@nestjs/common';
import { PetDbService } from '../data/pet/pet.service';
import { VaccinationDbService } from '../data/vaccination/vaccination.service';
import { VaccinationCreateDto } from '../dto/vaccination-create.dto';

@Injectable()
export class VaccinationService {
  constructor(private petDbService: PetDbService, private vaccinationDbService: VaccinationDbService) {}

  async add(userId: string, petId: string, payload: VaccinationCreateDto) {
    const pet = await this.petDbService.findById(petId, userId);

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return await this.vaccinationDbService.add(pet, payload);
  }

  async findByPetId(petId: string) {
    return await this.vaccinationDbService.findByPetId(petId);
  }

  async removeById(vaccineId: string, petId: string) {
    return await this.vaccinationDbService.remove(vaccineId, petId);
  }
}
