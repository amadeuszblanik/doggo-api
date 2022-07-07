import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Pet } from '../pet/pet.entity';
import { User } from '../user/user.entity';

@Entity()
export class PetWeight extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weight: number;

  @Column()
  date: Date;

  @ManyToOne(() => Pet, (pet) => pet.id)
  pet: Pet;

  @ManyToOne(() => User, (user) => user.id)
  addedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
