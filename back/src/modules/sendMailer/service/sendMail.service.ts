import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService) {}

  public mailRegister(email: string, token: string) {
    const urlValidation = process.env.BACK_URL + '/api/register/validation/' + token;
    this
      .mailerService
      .sendMail({
        to: email,
        subject: 'Bienvenue',
        text: 'welcome',
        html: '<b>Bienvenue</b><p>Lien vers la validation <a href="'+urlValidation+'">Cliquez ici</a></p>',
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
  }
}