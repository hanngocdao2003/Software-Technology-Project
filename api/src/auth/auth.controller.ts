import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtService} from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { AuthDTO } from './dto'
@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService,
    ){}
    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Body() authDTO: AuthDTO  ){
        console.log(authDTO);
        
        return this.authService.register(authDTO)
        
    }
    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() authDTO: AuthDTO){
        return this.authService.login(authDTO)
    }

}
