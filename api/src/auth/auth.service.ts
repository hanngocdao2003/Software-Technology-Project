import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private configService : ConfigService,
        private prismaService : PrismaService,
        private jwtService : JwtService
    ){}
    async register(authDTO: AuthDTO){
        const checkEmailExist = await this.prismaService.user.findUnique({
            where: {
                email: authDTO.email
            }
        })
        if(checkEmailExist){
            throw new ForbiddenException('Email đã tồn tại')
            return; 
        }
        const hashedPassword = await argon.hash(authDTO.password)
        const user = await this.prismaService.user.create({
            data:{
                email: authDTO.email,
                hashedPassword
            }
        })
        delete user.hashedPassword
        return this.signJwtString(user.id, user.email, user.isAdmin)
    }
    async login( authDTO: AuthDTO){
        const user = await this.prismaService.user.findUnique({
            where:{
                email: authDTO.email
            }
        })
        if(!user){
            return new ForbiddenException('Email không tồn tại')
        }
        const salt = await argon.verify(user.hashedPassword, authDTO.password)
        if(!salt){
            return new ForbiddenException('Mật khẩu không chính xác')

        }
        delete user.hashedPassword
        const accessToken = await this.signJwtString(user.id, user.email, user.isAdmin)
        return {
            status: 200,
            user,
            accessToken
        }
    }
    async signJwtString(userId: number , email: string, isAdmin : boolean):Promise<{
        accessToken: string
    }>{
        const payload = {
            sub: userId,
            email,
            isAdmin
        }
        const jwtString = await this.jwtService.signAsync(payload,{
            expiresIn: "10m",
            secret: this.configService.get("JWT_SECRET")
        })
        return {
            accessToken: jwtString
        }
    }
}
