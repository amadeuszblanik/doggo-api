import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PetCreateDto } from '../dto/pet-create.dto';
import { JwtPayload } from '../types/jwt-payload.types';
import { PetDbService } from '../data/pet/pet.service';
import { PetUsersDbService } from '../data/petUsers/petUsers.service';
import { PetsRoles } from '../types/pets-roles.types';
import { Pet } from '../data/pet/pet.entity';
import { PetInviteDto } from '../dto/pet-invite.dto';
import { UsersDbService } from '../data/user/users.service';
import { convertWeight } from '../utils';
import { WeightUnits } from '../types/weight-units.types';

@Injectable()
export class PetService {
  constructor(private userDbService: UsersDbService, private petDbService: PetDbService, private petUsersDbService: PetUsersDbService) {}

  async createNew(payload: PetCreateDto, userInfo: JwtPayload): Promise<Pet> {
    const user = await this.userDbService.findById(userInfo.userid);
    const pet = await this.petDbService.add(payload);
    await this.petUsersDbService.add({
      user,
      pet,
      role: PetsRoles.Owner,
    });

    return pet;
  }

  async removePet(petId: string, userId: string): Promise<Pet> {
    const pet = await this.petDbService.findById(petId, userId);

    pet.isActive = false;

    return pet.save();
  }

  async getAllByUserId(userId: string, unit: WeightUnits) {
    const petsOfUser = await this.petDbService.findByUserId(userId);

    return petsOfUser.map((pet) => ({
      ...pet,
      weight: pet.weight.map((petWeight) => ({ ...petWeight, weight: convertWeight(petWeight.weight, WeightUnits.Gram, unit), unit })),
      petUsers: pet.petUsers.map(({ role, user }) => ({
        role,
        user: { email: user.email, firstName: user.firstName, lastName: user.lastName },
      })),
    }));
  }

  async getByPetId(petId: string, unit: WeightUnits, userId: string) {
    const petDetails = await this.petDbService.findById(petId, userId);

    if (!petDetails) {
      throw new NotFoundException('Pet details not found');
    }

    return {
      ...petDetails,
      weight: petDetails.weight.map((petWeight) => ({
        ...petWeight,
        weight: convertWeight(petWeight.weight, WeightUnits.Gram, unit),
        unit,
      })),
      petUsers: petDetails.petUsers.map(({ role, user }) => ({
        role,
        user: { email: user.email, firstName: user.firstName, lastName: user.lastName },
      })),
    };
  }

  async inviteNewUser(payload: PetInviteDto, userId: string) {
    const isAlreadyExists = await this.petUsersDbService.checkIfExists(payload.userEmail, payload.petId);
    const user = await this.userDbService.findByEmail(payload.userEmail);
    const pet = await this.petDbService.findById(payload.petId, userId);

    if (isAlreadyExists) {
      throw new ConflictException('This user already was added to the pet');
    }

    if (!user) {
      throw new ConflictException('User not exists');
    }

    if (!pet) {
      throw new ConflictException('Pet not exists');
    }

    await this.petUsersDbService.add({
      user,
      pet,
      role: payload.role,
    });

    return true;
  }
}
