import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'bme-utils';
import { Med } from './med.entity';
import { Pet } from '../pet/pet.entity';
import { MedCreateDto } from '../../dto/med-create.dto';

@Injectable()
export class MedDbService {
  constructor(
    @InjectRepository(Med)
    private medRepository: Repository<Med>,
  ) {}

  async add(pet: Pet, payload: MedCreateDto): Promise<Med> {
    const med = new Med();

    med.name = payload.name;
    med.description = payload.description || '';
    med.reminders = payload.reminders || false;
    med.takenDate = payload.takenDate;
    med.validDate = payload.validDate;
    med.pet = pet;

    return await med.save();
  }

  findByPetId(petId: string): Promise<Med[]> {
    return this.medRepository.find({ where: { pet: { id: petId } }, order: { takenDate: 'DESC' } });
  }

  async remove(id: string, petId: string): Promise<void> {
    const removeResults = await this.medRepository.delete({ id, pet: { id: petId } });

    if (isEmpty(removeResults.affected)) {
      throw new NotFoundException('Med entry not found');
    }
  }
}
