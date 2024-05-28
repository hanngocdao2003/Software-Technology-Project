import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { AdminMiddleware } from 'src/user/user.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports:[
    JwtModule.register({}),
    PrismaModule,
    TicketModule
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports :[
    VehicleService
  ]
})
export class VehicleModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AdminMiddleware).forRoutes('/vehicle/*')
  }
}
