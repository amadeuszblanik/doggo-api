import { Test, TestingModule } from '@nestjs/testing';
import { PetDbService } from './pet.service';

describe('PetService', () => {
  let service: PetDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetDbService],
    }).compile();

    service = module.get<PetDbService>(PetDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
