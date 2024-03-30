import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtService} from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { AuthDTO } from './dto.auth.dto';
@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService,
        private jwtService : JwtService,
        private configService : ConfigService
    ){}
    @Post('register')
    async register(@Body() authDTO: AuthDTO  ){
        console.log(authDTO);
        
        return this.authService.register(authDTO)
        
    }
    @Post('login')
    async login(@Body() authDTO: AuthDTO){
        return this.authService.login(authDTO)
    }

}
