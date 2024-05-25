import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { MailModule } from 'src/mailer/mailer.module';

@Module({
  imports : [
    MailModule
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports:[
    TicketService
  ]
})
export class TicketModule {}
