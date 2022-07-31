import { Injectable, NotFoundException } from '@nestjs/common';
import { PetDbService } from '../data/pet/pet.service';
import { MedDbService } from '../data/med/med.service';
import { MedCreateDto } from '../dto/med-create.dto';

@Injectable()
export class MedService {
  constructor(private petDbService: PetDbService, private medDbService: MedDbService) {}

  async add(userId: string, petId: string, payload: MedCreateDto) {
    const pet = await this.petDbService.findById(petId, userId);

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return await this.medDbService.add(pet, payload);
  }

  async findByPetId(petId: string) {
    return await this.medDbService.findByPetId(petId);
  }

  async removeById(vaccineId: string, petId: string) {
    return await this.medDbService.remove(vaccineId, petId);
  }
}
