import { WeightUnits } from './weight-units.types';

export interface JwtResponse {
  username: string;
  userid: string;
  weightUnit: WeightUnits;
}
