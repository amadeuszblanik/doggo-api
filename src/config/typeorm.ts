import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../data/user/user.entity';
import { Pet } from '../data/pet/pet.entity';
import { PetUsers } from '../data/petUsers/petUsers.entity';
import { PetWeight } from '../data/petWeight/petWeight.entity';
import { Vaccination } from '../data/vaccination/vaccination.entity';
import { Breed } from '../data/breed/breed.entity';
import { UserRole } from '../data/userRole/userRole.entity';
import { Role } from '../data/role/role.entity';
import { PetBreed } from '../data/petBreed/petBreed.entity';
import { Med } from '../data/med/med.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql' as const,
    host: configService.get<string>('DATABASE_HOST'),
    port: parseInt(configService.get<string>('DATABASE_PORT'), 10),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASS'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [Breed, User, Pet, PetBreed, PetUsers, PetWeight, Vaccination, UserRole, Role, Med],
    synchronize: true,
  }),
  inject: [ConfigService],
};
