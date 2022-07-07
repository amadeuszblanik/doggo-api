import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PetKind } from '../../types/pet-kind.types';
import { PetUsers } from '../petUsers/petUsers.entity';
import { PetWeight } from '../petWeight/petWeight.entity';

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

  @Column()
  breed: string;

  @Column({ default: '' })
  microchip: string;

  @Column()
  birthDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PetUsers, (petUsers) => petUsers.pet)
  petUsers: PetUsers[];

  @OneToMany(() => PetWeight, (petWeight) => petWeight.pet)
  weight: PetWeight[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
