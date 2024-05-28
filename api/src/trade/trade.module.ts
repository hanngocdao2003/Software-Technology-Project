import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { AdminMiddleware } from 'src/user/user.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports :[
    JwtModule.register({})
  ],
  controllers: [TradeController],
  providers: [TradeService]
})
export class TradeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AdminMiddleware).forRoutes('trade/*')
  }
}
