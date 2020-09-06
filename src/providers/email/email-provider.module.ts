import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { EmailConfigModule } from 'src/config/email/email-config.module';
import { EmailConfigService } from 'src/config/email/email-config.service';
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [EmailConfigModule],
      useFactory: async (emailConfigService: EmailConfigService) => ({
        transport: {
          host: emailConfigService.host,
          port: emailConfigService.port,
          secure: emailConfigService.secure,
          auth: {
            user: emailConfigService.user,
            pass: emailConfigService.password,
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
        template: {
          dir: process.cwd() + '/src/config/email/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [EmailConfigService],
    }),
  ],
})
export class EmailProviderModule {}
