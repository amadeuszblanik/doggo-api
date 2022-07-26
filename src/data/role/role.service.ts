import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { UserRoles } from '../../types/user-roles.types';

@Injectable()
export class RoleDbService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async initRoles(): Promise<boolean> {
    const roles = Object.keys(UserRoles);

    for (const userRole of roles) {
      if (await this.findByName(userRole)) {
        continue;
      }

      const role = new Role();
      role.name = userRole as UserRoles;
      await this.roleRepository.save(role);
    }

    return true;
  }

  async findByName(name: UserRoles | string): Promise<Role> {
    return this.roleRepository.findOne({ where: { name: name as UserRoles } });
  }
}
