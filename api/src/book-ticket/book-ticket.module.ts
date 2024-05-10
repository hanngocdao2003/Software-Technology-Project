import { Module } from '@nestjs/common';
import { BookTicketService } from './book-ticket.service';
import { BookTicketController } from './book-ticket.controller';
import { VehicleModule } from 'src/vehicle/vehicle.module';

@Module({
  imports:[
    VehicleModule
  ],
  providers: [BookTicketService],
  controllers: [BookTicketController]
})
export class BookTicketModule {}
