import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Pet } from '../pet/pet.entity';
import { Breed } from '../breed/breed.entity';

@Entity()
export class PetBreed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pet, (pet) => pet.id)
  pet: Pet;

  @ManyToOne(() => Breed, (breed) => breed.id)
  breed: Breed;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
