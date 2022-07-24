import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersDbService } from '../data/user/users.service';
import { User } from '../data/user/user.entity';
import { AuthSignUpDto } from '../dto/auth-sign-up.dto';
import { MessageResponse } from '../types/message-response.types';
import { EmailService } from '../email/email.service';
import { UserEmailVerificationPayload } from '../types/user-email-verification-payload.types';
import { WeightUnits } from '../types/weight-units.types';
import { UserUpdateSettingsDto } from '../dto/user-update-settings.dto';
import { UserResetPasswordDto } from '../dto/user-reset-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private usersDbService: UsersDbService,
  ) {}

  async createUser(signUpData: AuthSignUpDto): Promise<MessageResponse> {
    const isUserExists = Boolean(await this.usersDbService.findByEmail(signUpData.email));
    const isPasswordConfirmed = signUpData.password === signUpData.passwordConfirm;

    if (isUserExists) {
      throw new ConflictException('You already was registered. Please try to sign up or reset password.');
    }

    if (!isPasswordConfirmed) {
      throw new ConflictException('Passwords are not the same');
    }

    const createdUser = await this.usersDbService.add(signUpData);
    await this.sendUserEmailConfirmation(createdUser);

    return { message: 'You was successfully registered! Please confirm your email address within next 3 days', success: true };
  }

  updateProfile(userId: string, userData: UserUpdateSettingsDto): Promise<User> {
    return this.usersDbService.update(userId, userData);
  }

  async updatePassword(
    userEmail: string,
    currentPassword: string,
    newPassword: string,
    newPasswordConfirm: string,
  ): Promise<MessageResponse> {
    const isPasswordConfirmed = newPassword === newPasswordConfirm;

    if (!isPasswordConfirmed) {
      throw new ConflictException('Passwords are not the same');
    }

    await this.usersDbService.updatePassword(userEmail, currentPassword, newPassword);

    return { message: 'Your password was changed', success: true };
  }

  getById(id: string): Promise<User> {
    return this.usersDbService.findById(id);
  }

  getByEmail(email: string): Promise<User> {
    return this.usersDbService.findByEmail(email);
  }

  async getWeightUnitById(id: string): Promise<WeightUnits> {
    const user = await this.getById(id);

    return user.weightUnit;
  }

  getAllUser(): Promise<User[]> {
    return this.usersDbService.findAll();
  }

  confirmUserEmail(token: string) {
    const payload = this.jwtService.verify<UserEmailVerificationPayload>(token, {
      secret: this.configService.get('JWT_USER_VERIFICATION_TOKEN_SECRET'),
    });

    if (!payload) {
      throw new Error('Invalid token');
    }

    const { email } = payload;

    return this.usersDbService.confirmEmail(email);
  }

  resetPassword(token: string, body: UserResetPasswordDto) {
    const payload = this.jwtService.verify<UserEmailVerificationPayload>(token, {
      secret: this.configService.get('JWT_USER_VERIFICATION_TOKEN_SECRET'),
    });

    if (!payload) {
      throw new Error('Invalid token');
    }

    const { email } = payload;

    return this.usersDbService.resetPassword(email, body.password);
  }

  async removeUser(userId: string): Promise<MessageResponse> {
    await this.usersDbService.remove(userId);

    return {
      success: true,
      message: 'Your account was successfully disabled. If you would not change your mind it might be fully removed in future.',
    };
  }

  sendUserEmailConfirmation(user: User) {
    try {
      const payload: UserEmailVerificationPayload = { email: user.email };
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_USER_VERIFICATION_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_USER_VERIFICATION_TOKEN_EXPIRATION_TIME'),
      });

      return this.emailService.sendUserConfirmation(user, token);
    } catch (_) {
      throw new ConflictException('Provided token is not valid');
    }
  }

  async sendResetPassword(userEmail: string): Promise<MessageResponse> {
    const user = await this.usersDbService.findByEmail(userEmail);

    if (!user) {
      throw new NotFoundException("User with this email doesn't exist");
    }

    const payload: UserEmailVerificationPayload = { email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_USER_RESET_PASSWORD_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_USER_RESET_PASSWORD_TOKEN_EXPIRATION_TIME'),
    });

    await this.emailService.sendResetPassword(user, token);

    return { message: 'Email with reset password link was sent', success: true };
  }
}
