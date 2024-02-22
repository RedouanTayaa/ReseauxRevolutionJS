import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendMailService } from '@mailer/service/sendMail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT as unknown as number,
        secure: false, // upgrade later with STARTTLS
      },
      defaults: {
        from:'"Réseaux Révolution" <support@reseaux-revolution.com>',
      },
    }),
  ],
  providers: [SendMailService],
  exports: [SendMailService],
})
export class SendMailerModule {}
