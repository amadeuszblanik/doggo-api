import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PetUsers } from '../petUsers/petUsers.entity';
import { WeightUnits } from '../../types/weight-units.types';
import { hashPassword } from '../../utils';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({
    type: 'enum',
    enum: WeightUnits,
    default: WeightUnits.Kilogram,
  })
  weightUnit: string;

  @OneToMany(() => PetUsers, (petUsers) => petUsers.user)
  petUsers: PetUsers[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await hashPassword(password || this.password);
  }
}
