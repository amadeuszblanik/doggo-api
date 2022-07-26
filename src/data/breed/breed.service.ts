import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'bme-utils';
import { Breed } from './breed.entity';
import { levenshteinDistance } from '../../utils';
import { BreedCreateDto } from '../../dto/breed-create.dto';

@Injectable()
export class BreedDbService {
  constructor(
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {}

  async create(breed: BreedCreateDto): Promise<Breed> {
    return this.breedRepository.save(breed);
  }

  async createFromCsv(breeds: BreedCreateDto[]): Promise<{ added: string[]; skipped: string[] }> {
    const added: string[] = [];
    const skipped: string[] = [];

    for (const breed of breeds) {
      const existingBreed = await this.checkIfExistsByName(breed.name);

      if (!existingBreed) {
        await this.breedRepository.save(breed);
        added.push(breed.name);
        continue;
      }

      skipped.push(breed.name);
    }

    return { added, skipped };
  }

  async findById(id: number): Promise<Breed> {
    const selectedBreed = await this.breedRepository.findOne({ where: { id } });

    if (!selectedBreed) {
      throw new NotFoundException('Breed not found');
    }

    return selectedBreed;
  }

  async findByName(name: string): Promise<Breed> {
    const selectedBreed = await this.breedRepository.findOne({ where: { name } });

    if (!selectedBreed) {
      throw new NotFoundException('Breed not found');
    }

    return selectedBreed;
  }

  async checkIfExistsByName(name: string): Promise<boolean> {
    const selectedBreed = await this.breedRepository.findOne({ where: { name } });

    return Boolean(selectedBreed);
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

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.breedRepository.delete(id);

    return !isEmpty(affected);
  }
}
