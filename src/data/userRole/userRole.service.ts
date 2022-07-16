import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './userRole.entity';
import { UserRoles } from '../../types/user-roles.types';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';

@Injectable()
export class UserRoleDbService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async change(userId: string, nextRole: UserRoles): Promise<UserRole> {
    const userRole = (await this.userRoleRepository.findOne({ where: { user: { id: userId } } })) || new UserRole();
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const role = await this.roleRepository.findOne({ where: { name: nextRole } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    userRole.user = user;
    userRole.role = role;

    return userRole.save();
  }
}
