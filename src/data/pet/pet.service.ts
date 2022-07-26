import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Pet } from './pet.entity';
import { PetCreateDto } from '../../dto/pet-create.dto';
import { Breed } from '../breed/breed.entity';
import { PetUpdateDto } from '../../dto/pet-update.dto';

@Injectable()
export class PetDbService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    private readonly configService: ConfigService,
  ) {}

  async add(payload: PetCreateDto, breed: Breed, userId: string): Promise<Pet> {
    const petsOfUser = await this.findByUserId(userId);
    const petsLimitPerUser = Number(this.configService.get('PETS_LIMIT_PER_USER'));

    if (petsOfUser.length >= petsLimitPerUser) {
      throw new ForbiddenException(`You can only have ${String(petsLimitPerUser)} pets assigned to your account`);
    }

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

  async update(id: string, userId: string, payload: PetUpdateDto, breed?: Breed): Promise<Pet> {
    const pet = await this.findById(id, userId);

    if (payload.name) {
      pet.name = payload.name;
    }

    if (payload.kind) {
      pet.kind = payload.kind;
    }

    if (payload.microchip) {
      pet.microchip = payload.microchip;
    }

    if (payload.birthDate) {
      pet.birthDate = payload.birthDate;
    }

    if (breed) {
      pet.breed = breed;
    }

    return pet.save();
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

  async userLimits(userId: string) {
    const allPets = await this.petRepository.find({
      relations: ['petUsers', 'petUsers.user', 'weight', 'breed'],
      order: {
        weight: {
          date: 'DESC',
        },
      },
    });
    const activePets = allPets
      .filter(({ petUsers }) => petUsers.some(({ user: { id } }) => id === userId))
      .filter(({ isActive }) => isActive);
    const petsLimitPerUser = Number(this.configService.get('PETS_LIMIT_PER_USER'));

    return {
      activePets: activePets.length,
      petsLimitPerUser,
    };
  }

  async remove(id: string): Promise<void> {
    await this.petRepository.delete(id);
  }
}
