import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { BookTicketService } from './book-ticket.service';
import { BuyDTO } from './dto/byDTO';
import { checkDTO } from './dto/checkDTO';

@Controller('book-ticket')
export class BookTicketController {
    constructor (
        private bookTicketService : BookTicketService
    ){}
    @Post('check')
    @UsePipes(checkDTO)
    checkTicket(@Body() checkDTO : checkDTO){
        return this.bookTicketService.checkTicket(checkDTO)
    }
    @Post('buy')
    @UsePipes(BuyDTO)
    byTicket(@Body() buyDTO:BuyDTO){
        console.log(buyDTO);
        
        return this.bookTicketService.buyTicket(buyDTO)
    
    }
    @Get(':id')
    getVehicle(@Param('id') id : string){
        return this.bookTicketService.getVehicle(id)
    }
  
}
