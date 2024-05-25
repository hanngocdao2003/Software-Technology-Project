import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mailer.service';
import { SendEmailDto } from './mail.interface';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailService: MailService) {}
@Post('send-email')
    async sendMail(@Body() dto: SendEmailDto){
        console.log(dto);
        
        return this.mailService.sendMail(dto)
    }
}
