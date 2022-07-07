import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../data/user/user.entity';
import { Pet } from '../data/pet/pet.entity';
import { PetUsers } from '../data/petUsers/petUsers.entity';
import { PetWeight } from '../data/petWeight/petWeight.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql' as const,
    host: configService.get<string>('DATABASE_HOST'),
    port: parseInt(configService.get<string>('DATABASE_PORT'), 10),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASS'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [User, Pet, PetUsers, PetWeight],
    synchronize: true,
  }),
  inject: [ConfigService],
};