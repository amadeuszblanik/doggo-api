import { Test, TestingModule } from '@nestjs/testing';
import { PetWeightService } from './pet-weight.service';

describe('PetWeightService', () => {
  let service: PetWeightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetWeightService],
    }).compile();

    service = module.get<PetWeightService>(PetWeightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
