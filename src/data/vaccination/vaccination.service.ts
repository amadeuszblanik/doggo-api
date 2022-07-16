import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaccination } from './vaccination.entity';
import { VaccinationCreateDto } from '../../dto/vaccination-create.dto';
import { Pet } from '../pet/pet.entity';

@Injectable()
export class VaccinationDbService {
  constructor(
    @InjectRepository(Vaccination)
    private vaccinationRepository: Repository<Vaccination>,
  ) {}

  async add(pet: Pet, payload: VaccinationCreateDto): Promise<Vaccination> {
    const vaccination = new Vaccination();

    vaccination.name = payload.name;
    vaccination.description = payload.description;
    vaccination.reminders = payload.reminders;
    vaccination.vaccinationDate = payload.vaccinationDate;
    vaccination.validDate = payload.validDate;
    vaccination.pet = pet;

    return await vaccination.save();
  }

  findByPetId(petId: string): Promise<Vaccination[]> {
    return this.vaccinationRepository.find({ where: { pet: { id: petId } }, order: { vaccinationDate: 'DESC' } });
  }

  async remove(id: string): Promise<void> {
    await this.vaccinationRepository.delete(id);
  }
}
