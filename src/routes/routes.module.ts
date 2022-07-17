import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { PetController } from './pet/pet.controller';
import { ConfigController } from './config/config.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { PetModule } from '../pet/pet.module';
import { PetWeightModule } from '../pet-weight/pet-weight.module';
import { VaccinationModule } from '../vaccination/vaccination.module';
import { BreedDbModule } from '../data/breed/breed.module';

@Module({
  imports: [UserModule, PetModule, PetWeightModule, AuthModule, VaccinationModule, BreedDbModule],
  controllers: [AuthController, PetController, ConfigController],
})
export class RoutesModule {}
