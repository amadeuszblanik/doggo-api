import { WeightUnits } from '../types/weight-units.types';
import { Pet } from '../data/pet/pet.entity';
import { User } from '../data/user/user.entity';

export interface PetWeightAddPayload {
  pet: Pet;
  weight: number;
  unit: WeightUnits;
  date: Date;
  addedBy: User;
}
