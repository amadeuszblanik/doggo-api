import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { PetController } from './pet/pet.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { PetModule } from '../pet/pet.module';
import { PetWeightModule } from '../pet-weight/pet-weight.module';

@Module({
  imports: [UserModule, PetModule, PetWeightModule, AuthModule],
  controllers: [AuthController, PetController],
})
export class RoutesModule {}