import { PetsRoles } from './pets-roles.types';
import { Pet } from '../data/pet/pet.entity';
import { User } from '../data/user/user.entity';

export interface PetAddPayload {
  pet: Pet;
  user: User;
  role: PetsRoles;
}
