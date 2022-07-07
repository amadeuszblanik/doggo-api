import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    transport: {
      host: configService.get<string>('EMAIL_HOST'),
      port: parseInt(configService.get<string>('EMAIL_PORT'), 10),
      secure: configService.get<string>('EMAIL_SECURE') === 'true',
      auth: {
        user: configService.get<string>('EMAIL_USER'),
        pass: configService.get<string>('EMAIL_PASSWORD'),
      },
    },
    defaults: {
      from: '"nest-modules" <modules@nestjs.com>',
    },
    template: {
      dir: process.cwd() + '/templates/',
      adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
  }),
  inject: [ConfigService],
};
