import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PetKind } from '../../types/pet-kind.types';
import { PetUsers } from '../petUsers/petUsers.entity';
import { PetWeight } from '../petWeight/petWeight.entity';
import { Breed } from '../breed/breed.entity';

@Entity()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: PetKind,
    default: PetKind.Dog,
  })
  kind: string;

  @ManyToOne(() => Breed, (breed) => breed.id)
  breed: Breed;

  @Column({ default: '' })
  microchip: string;

  @Column()
  birthDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @OneToMany(() => PetUsers, (petUsers) => petUsers.pet)
  petUsers: PetUsers[];

  @Exclude()
  @OneToMany(() => PetWeight, (petWeight) => petWeight.pet)
  weight: PetWeight[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
