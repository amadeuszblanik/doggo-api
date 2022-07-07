import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'bme-utils';
import { PetUsers } from './petUsers.entity';
import { PetAddPayload } from '../../types/pet-add-payload.types';

@Injectable()
export class PetUsersDbService {
  constructor(
    @InjectRepository(PetUsers)
    private petUsersRepository: Repository<PetUsers>,
  ) {}

  async add(payload: PetAddPayload): Promise<PetUsers> {
    const petUsers = new PetUsers();
    //
    petUsers.pet = payload.pet;
    petUsers.user = payload.user;
    petUsers.role = payload.role;

    return await petUsers.save();
  }

  async checkIfExists(userEmail: string, petId: string): Promise<boolean> {
    const petUsersRecord = await this.petUsersRepository.find({
      where: { user: { email: userEmail }, pet: { id: petId } },
      relations: ['user', 'user'],
    });

    return !isEmpty(petUsersRecord);
  }

  async remove(id: number): Promise<void> {
    await this.petUsersRepository.delete(id);
  }
}
