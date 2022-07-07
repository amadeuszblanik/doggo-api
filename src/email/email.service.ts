import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { SentMessageInfo } from 'nodemailer';
import { User } from '../data/user/user.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService, private configService: ConfigService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.configService.get<string>('DOMAIN')}/api/auth/confirm-email?token=${token}`;

    await this.sendEmail(user.email, 'Confirm your email', 'confirmation', { name: user.firstName, url });
  }

  async sendResetPassword(user: User, token: string) {
    const url = `${this.configService.get<string>('RESET_PASSWORD_URL')}?token=${token}`;

    await this.sendEmail(user.email, 'Reset your password', 'reset-password', { name: user.firstName, url });
  }

  private sendEmail(to: string, subject: string, template: string, context: { [name: string]: any }): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      to,
      from: `"${this.configService.get<string>('EMAIL_NAME')}" <${this.configService.get<string>('EMAIL_SENDER_ADDRESS')}>`, // override default from
      subject,
      template,
      context,
    });
  }
}
