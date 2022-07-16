import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'bme-utils';
import { PetWeight } from './petWeight.entity';
import { PetWeightAddPayload } from '../../types/pet-weight-add-payload.types';
import { convertWeight } from '../../utils';

@Injectable()
export class PetWeightDbService {
  constructor(
    @InjectRepository(PetWeight)
    private petWeightRepository: Repository<PetWeight>,
  ) {}

  async add(payload: PetWeightAddPayload): Promise<PetWeight> {
    const petWeight = new PetWeight();

    petWeight.pet = payload.pet;
    petWeight.weight = convertWeight(payload.weight, payload.unit);
    petWeight.date = payload.date;
    petWeight.addedBy = payload.addedBy;

    return await petWeight.save();
  }

  findByPetId(petId: string): Promise<PetWeight[]> {
    return this.petWeightRepository.find({ where: { pet: { id: petId } }, order: { date: 'DESC' } });
  }

  async remove(id: number, petId: string): Promise<void> {
    const removeResults = await this.petWeightRepository.delete({ id, pet: { id: petId } });

    if (isEmpty(removeResults.affected)) {
      throw new NotFoundException('Weight entry not found');
    }
  }
}
