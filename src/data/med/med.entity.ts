import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Pet } from '../pet/pet.entity';
import { User } from '../user/user.entity';

@Entity()
export class Med extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  takenDate: Date;

  @Column({
    default: true,
  })
  reminders: boolean;

  @Column({
    nullable: true,
    default: null,
  })
  validDate: Date;

  @Exclude()
  @ManyToOne(() => Pet, (pet) => pet.id)
  pet: Pet;

  @ManyToOne(() => User, (user) => user.id)
  addedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
