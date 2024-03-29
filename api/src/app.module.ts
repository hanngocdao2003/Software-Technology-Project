import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceController } from './province/province.controller';
import { ProvinceModule } from './province/province.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProvinceModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
