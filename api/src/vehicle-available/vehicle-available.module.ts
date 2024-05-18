import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { VehicleAvailableService } from './vehicle-available.service';
import { VehicleAvailableController } from './vehicle-available.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminMiddleware } from 'src/user/user.middleware';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  providers: [VehicleAvailableService],
  controllers: [VehicleAvailableController],
  imports: [
    PrismaModule,
     JwtModule.register({}),
     TicketModule
    ],
    exports :[VehicleAvailableService]
})
export class VehicleAvailableModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes('/vehicle-depart/*')
}
}
