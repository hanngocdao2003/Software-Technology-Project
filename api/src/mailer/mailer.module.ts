
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { join } from 'path';
import { MailerController } from './mailer.controller';

@Module({
  providers: [MailService],
  controllers: [MailerController],
  exports: [MailService], // 
})
export class MailModule {}
