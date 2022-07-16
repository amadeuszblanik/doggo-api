import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './breed.entity';

@Injectable()
export class BreedDbService {
  constructor(
    @InjectRepository(Breed)
    private petRepository: Repository<Breed>,
  ) {}

  async remove(id: string): Promise<void> {
    await this.petRepository.delete(id);
  }
}
