import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetBreed } from './petBreed.entity';
import { Breed } from '../breed/breed.entity';
import { Pet } from '../pet/pet.entity';

@Injectable()
export class PetBreedDbService {
  constructor(
    @InjectRepository(PetBreed)
    private petBreedRepository: Repository<PetBreed>,
  ) {}

  async add(pet: Pet, breed: Breed): Promise<PetBreed> {
    const petBreed = new PetBreed();

    petBreed.breed = breed;
    petBreed.pet = pet;

    return await petBreed.save();
  }
}
