import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceController } from './province/province.controller';
import { ProvinceModule } from './province/province.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { TradeModule } from './trade/trade.module';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TicketModule } from './ticket/ticket.module';
import { SearchModule } from './search/search.module';
import { BookTicketModule } from './book-ticket/book-ticket.module';
import { VehicleAvailableModule } from './vehicle-available/vehicle-available.module';

@Module({
    AuthModule,
    JwtModule.register({}),
    ConfigModule.forRoot({
    }),
    TradeModule,
    UserModule,
    VehicleModule,
    TicketModule,
    SearchModule,
    BookTicketModule,
    VehicleAvailableModule,
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory : async (config : ConfigService)=>({
    //     transport:{
    //       host: config.get('MAIL_HOST'),
    //       secure: false,
    //       auth:{
    //         user : config.get('MAIL_USER'),
    //         pass: config.get('MAIL_PASSWORD')
    //       }
    //     },
    //     defaults: {
    //       from : `No Reply <${config.get('MAIL_FROM')}>`
    //     },
    //     template: {
    //       dir : join(__dirname, 'src/templates/email'),
    //       adapter: new HandlebarsAdapter(),
    //       options:{
    //         strict: true
    //       }
    //     }
    //   }),
    //   inject: [ConfigService]
    // })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
