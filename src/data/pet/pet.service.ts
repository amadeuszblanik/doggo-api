import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { PetCreateDto } from '../../dto/pet-create.dto';
import { Breed } from '../breed/breed.entity';

@Injectable()
export class PetDbService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  async add(payload: PetCreateDto, breed: Breed): Promise<Pet> {
    const pet = new Pet();

    pet.name = payload.name;
    pet.kind = payload.kind;
    pet.breed = breed;
    pet.microchip = payload.microchip;
    pet.birthDate = payload.birthDate;

    return await pet.save();
  }

  findAll(): Promise<Pet[]> {
    return this.petRepository.find({ relations: ['petUsers', 'petUsers.user', 'breed'] });
  }

  findById(id: string, userId: string): Promise<Pet> {
    return this.petRepository.findOne({
      where: { id, petUsers: { user: { id: userId } } },
      relations: ['petUsers', 'petUsers.user', 'weight', 'breed'],
      order: {
        weight: {
          date: 'DESC',
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<Pet[]> {
    const allPets = await this.petRepository.find({
      relations: ['petUsers', 'petUsers.user', 'weight', 'breed'],
      order: {
        weight: {
          date: 'DESC',
        },
      },
    });

    return allPets.filter(({ petUsers }) => petUsers.some(({ user: { id } }) => id === userId)).filter(({ isActive }) => isActive);
  }

  async remove(id: string): Promise<void> {
    await this.petRepository.delete(id);
  }
}
