import { WeightUnits } from './weight-units.types';
import { UserRoles } from './user-roles.types';

export interface JwtResponse {
  username: string;
  userid: string;
  weightUnit: WeightUnits;
  role: UserRoles;
}
