import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDTO } from './dto/ticket.dto';

@Controller('ticket')
export class TicketController {
    constructor(
        private ticketService : TicketService
    ){}
    @Post('update-ticket/:id')
    update(@Body() ticketDTO  : TicketDTO, @Query() ticketId: any){
        return this.ticketService.update(ticketDTO,ticketId)
    }
    @Post('my-ticket')
    getMyTicket(@Body('idUser') idUser: string){
        console.log(idUser);
        return this.ticketService.getMyTicket(idUser)
    }
}