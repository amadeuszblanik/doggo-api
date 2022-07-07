import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
import { mailerConfig } from '../config/mailer';

@Module({
  imports: [ConfigModule, MailerModule.forRootAsync(mailerConfig)],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
