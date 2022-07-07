import { PetKind } from './pet-kind.types';
import { PetsRoles } from './pets-roles.types';

export interface PetListResponse {
  id: number;
  name: string;
  kind: PetKind;
  breed: string;
  microchip: string;
  birthDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  petUsers: {
    role: PetsRoles;
    user: {
      email: string;
      firstName: string;
      lastName: string;
    };
  }[];
}
