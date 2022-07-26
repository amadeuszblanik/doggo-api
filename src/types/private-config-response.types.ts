import { UserRoles } from './user-roles.types';
import { WeightUnits } from './weight-units.types';

export interface PrivateConfigResponse {
  role: UserRoles;
  weightUnits: WeightUnits;
  userPets: number;
  userPetsAllowed: number;
  canAddNewPet: boolean;
}
