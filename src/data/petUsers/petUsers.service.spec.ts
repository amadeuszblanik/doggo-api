import { Test, TestingModule } from '@nestjs/testing';
import { PetUsersDbService } from './petUsers.service';

describe('PetService', () => {
  let service: PetUsersDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetUsersDbService],
    }).compile();

    service = module.get<PetUsersDbService>(PetUsersDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
