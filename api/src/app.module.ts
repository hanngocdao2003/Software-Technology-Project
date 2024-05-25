import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceController } from './province/province.controller';
import { ProvinceModule } from './province/province.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MailerModule} from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { TradeModule } from './trade/trade.module';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TicketModule } from './ticket/ticket.module';
import { SearchModule } from './search/search.module';
import { BookTicketModule } from './book-ticket/book-ticket.module';
import { VehicleAvailableModule } from './vehicle-available/vehicle-available.module';
import { MailModule } from './mailer/mailer.module';

@Module({
  imports: [ProvinceModule, 
    AuthModule,
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TradeModule,
    UserModule,
    VehicleModule,
    TicketModule,
    SearchModule,
    BookTicketModule,
    VehicleAvailableModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
