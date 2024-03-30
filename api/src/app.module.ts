import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceController } from './province/province.controller';
import { ProvinceModule } from './province/province.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProvinceModule, 
    AuthModule,
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
