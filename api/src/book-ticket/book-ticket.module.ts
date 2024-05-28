import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookTicketService } from './book-ticket.service';
import { BookTicketController } from './book-ticket.controller';
import { VehicleAvailableModule } from 'src/vehicle-available/vehicle-available.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { CustomerMiddleware } from 'src/user/user.custommer';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    VehicleAvailableModule,
    TicketModule,
    JwtModule.register({})
  ],
  providers: [BookTicketService],
  controllers: [BookTicketController]
})
export class BookTicketModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(CustomerMiddleware).forRoutes('/book-ticket/buy')
  }
}