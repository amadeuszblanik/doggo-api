import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from '../../data/user/user.entity';
import { UserService } from '../../user/user.service';
import { SETTINGS } from '../../app.utils';
import { AuthSignUpDto } from '../../dto/auth-sign-up.dto';
import { AuthSignInDto } from '../../dto/auth-sign-in.dto';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { AuthService } from '../../auth/auth.service';
import { SignInResponse } from '../../types/sign-in-response.types';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { JwtPayload } from '../../types/jwt-payload.types';
import { MessageResponse } from '../../types/message-response.types';
import { NO_CONTENT_STATUS_CODE } from '../../config/http';
import { UserChangePasswordDto } from '../../dto/user-change-password.dto';
import { UserUpdateSettingsDto } from '../../dto/user-update-settings.dto';
import { UserResetPasswordDto } from '../../dto/user-reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Post('sign-up')
  @ApiCreatedResponse({
    description: 'Created new user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async signUp(@Body(SETTINGS.VALIDATION_PIPE) body: AuthSignUpDto): Promise<MessageResponse> {
    return this.userService.createUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @ApiCreatedResponse({
    description: 'Verify user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot login. Try again!' })
  signIn(@Request() request: { user: User }, @Body(SETTINGS.VALIDATION_PIPE) _body: AuthSignInDto): SignInResponse {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiBadRequestResponse({ description: 'User cannot login. Try again!' })
  getProfile(@Request() req: { user: JwtPayload }) {
    return this.userService.getByEmail(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('profile')
  @ApiBadRequestResponse({ description: 'Something went wrong. Try again!' })
  putProfile(@Request() req: { user: JwtPayload }, @Body() body: UserUpdateSettingsDto) {
    return this.userService.updateProfile(req.user.userid, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('deactivate-user')
  @ApiBadRequestResponse({ description: 'Something went wrong. Try again!' })
  deleteDeactivateUser(@Request() req: { user: JwtPayload }) {
    return this.userService.removeUser(req.user.userid);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('change-password')
  @ApiBadRequestResponse({ description: 'Wrong password. Try again!' })
  putChangePassword(@Request() req: { user: JwtPayload }, @Body(SETTINGS.VALIDATION_PIPE) body: UserChangePasswordDto) {
    return this.userService.updatePassword(req.user.username, body.currentPassword, body.newPassword, body.newPasswordConfrim);
  }

  @Get('reset-password')
  @ApiBadRequestResponse({ description: 'User cannot be verified. Try again!' })
  async getResetPassword(@Query('user-email') userEmail: string): Promise<MessageResponse> {
    return this.userService.sendResetPassword(userEmail);
  }

  @Put('reset-password')
  @HttpCode(NO_CONTENT_STATUS_CODE)
  @ApiQuery({ name: 'token', type: 'string' })
  @ApiBadRequestResponse({ description: 'User cannot be verified. Try again!' })
  async putResetPassword(@Query('token') token: string, @Body(SETTINGS.VALIDATION_PIPE) body: UserResetPasswordDto): Promise<User> {
    return this.userService.resetPassword(token, body);
  }

  @Get('confirm-email')
  @HttpCode(NO_CONTENT_STATUS_CODE)
  @ApiQuery({ name: 'token', type: 'string' })
  @ApiBadRequestResponse({ description: 'User cannot be verified. Try again!' })
  async getConfirmEmail(@Query('token') token: string): Promise<void> {
    return this.userService.confirmUserEmail(token);
  }

  @Get('all') // DEV ONLY
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUser();
  }
}
