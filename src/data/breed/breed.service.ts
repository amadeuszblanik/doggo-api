import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './breed.entity';
import { levenshteinDistance } from '../../utils';

@Injectable()
export class BreedDbService {
  constructor(
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {}

  async findById(id: number): Promise<Breed> {
    const selectedBreed = await this.breedRepository.findOne({ where: { id } });

    if (!selectedBreed) {
      throw new NotFoundException('Breed not found');
    }

    return selectedBreed;
  }

  async listAll(): Promise<Breed[]> {
    return this.breedRepository.find();
  }

  async search(keyword: string, levenshtein?: number): Promise<Breed[]> {
    const breads = await this.breedRepository.find();

    return breads.filter(({ name }) => {
      const nameToSearch = name.toLowerCase();
      const keywordToSearch = keyword.toLowerCase();

      return levenshtein ? levenshteinDistance(nameToSearch, keywordToSearch) >= levenshtein : nameToSearch.includes(keywordToSearch);
    });
  }
}
