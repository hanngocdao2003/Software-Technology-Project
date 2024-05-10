import { Controller, Get, Param } from '@nestjs/common';
import { BookTicketService } from './book-ticket.service';

@Controller('book-ticket')
export class BookTicketController {
    constructor (
        private bookTicketService : BookTicketService
    ){}
    @Get(':id')
    getVehicle(@Param('id') id : string){
        return this.bookTicketService.getVehicle(id)
    }
}
