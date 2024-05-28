import { Injectable } from '@nestjs/common';
import { VehicleAvailableService } from 'src/vehicle-available/vehicle-available.service';
import { BuyDTO } from './dto/byDTO';
import { TicketService } from 'src/ticket/ticket.service';
import { checkDTO } from './dto/checkDTO';
import { log } from 'console';

@Injectable()
export class BookTicketService {
    constructor(
        private readonly vehicleService : VehicleAvailableService,
        private readonly ticketService : TicketService
    ){}
    async getVehicle(id : string){
        return this.vehicleService.getVehicle(id)
    }
    async buyTicket(buyTicket : BuyDTO){
      return this.ticketService.byTicket(buyTicket)
    }
    async checkTicket(checkDTO : checkDTO){
        return this.ticketService.checkTicket(checkDTO)
        
        
    }
}
