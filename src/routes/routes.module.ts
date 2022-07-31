import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { PetController } from './pet/pet.controller';
import { ConfigController } from './config/config.controller';
import { SuperuserController } from './superuser/superuser.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { PetModule } from '../pet/pet.module';
import { PetWeightModule } from '../pet-weight/pet-weight.module';
import { VaccinationModule } from '../vaccination/vaccination.module';
import { BreedDbModule } from '../data/breed/breed.module';
import { RoleDbModule } from '../data/role/role.module';
import { MedModule } from '../med/med.module';

@Module({
  imports: [UserModule, PetModule, PetWeightModule, AuthModule, VaccinationModule, BreedDbModule, RoleDbModule, MedModule],
  controllers: [AuthController, PetController, ConfigController, SuperuserController],
})
export class RoutesModule {}
