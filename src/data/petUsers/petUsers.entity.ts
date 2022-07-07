import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PetsRoles } from '../../types/pets-roles.types';
import { User } from '../user/user.entity';
import { Pet } from '../pet/pet.entity';

@Entity()
export class PetUsers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pet, (pet) => pet.id)
  pet: Pet;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({
    type: 'enum',
    enum: PetsRoles,
    default: PetsRoles.Mate,
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
