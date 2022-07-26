import { ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'bme-utils';
import { User } from './user.entity';
import { AuthSignUpDto } from '../../dto/auth-sign-up.dto';
import { UserUpdateSettingsDto } from '../../dto/user-update-settings.dto';
import { hashPassword } from '../../utils';
import { WeightUnits } from '../../types/weight-units.types';

@Injectable()
export class UsersDbService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async add(userData: AuthSignUpDto): Promise<User> {
    if (this.configService.get<string>('SIGN_UP_AVAILABLE') !== 'true') {
      throw new ForbiddenException('Sign up is not available at the moment.');
    }

    const user = new User();

    user.email = userData.email;
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.password = userData.password;

    return await user.save();
  }

  async update(userId: string, userData: UserUpdateSettingsDto): Promise<User> {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (isEmpty(Object.entries(userData))) {
      throw new UnprocessableEntityException('Nothing to change');
    }

    if (!Object.values(WeightUnits).includes(userData.weightUnit)) {
      throw new UnprocessableEntityException(
        `Provided unit is not allowed. Please select one of following: ${Object.values(WeightUnits).join(', ')}`,
      );
    }

    if (userData.firstName) {
      user.firstName = userData.firstName;
    }

    if (userData.lastName) {
      user.lastName = userData.lastName;
    }

    if (userData.weightUnit) {
      user.weightUnit = userData.weightUnit;
    }

    return await user.save();
  }

  async updatePassword(userEmail: string, currentPassword: string, newPassword: string): Promise<User> {
    const user = await this.findByEmail(userEmail);

    const isVerifiedPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isVerifiedPassword) {
      throw new ForbiddenException('Wrong password');
    }

    user.password = await hashPassword(newPassword);

    return await user.save();
  }

  async resetPassword(userEmail: string, newPassword: string): Promise<User> {
    const user = await this.findByEmail(userEmail);

    user.password = await hashPassword(newPassword);

    return await user.save();
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['userRole', 'userRole.role'] });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['userRole', 'userRole.role'] });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email }, relations: ['userRole', 'userRole.role'] });
  }

  async confirmEmail(email: string): Promise<void> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isEmailVerified) {
      throw new UnprocessableEntityException('User email is already verified');
    }

    await this.usersRepository.update({ email }, { isEmailVerified: true });

    return;
  }

  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = false;

    return await user.save();
  }
}
