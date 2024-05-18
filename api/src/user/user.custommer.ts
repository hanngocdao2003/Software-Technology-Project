import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class CustomerMiddleware  implements NestMiddleware {
  constructor(
    private readonly configService : ConfigService,
    private jwtService : JwtService
  ){}
  async use(req: Request, res: Response, next: () => void) {
    const authorization = req.headers.authorization
    if(authorization === null || authorization === undefined){
      return  res.status(403).json({status: 403,message: 'Không có token'})
    }
    const token = authorization.split(' ')[1]
    try {
      const user = await this.jwtService.verifyAsync(token ,{
        secret: this.configService.get('JWT_SECRET')
      })
      if(user){
        return next()
      }else{
        return res.status(400).json({status: 403 , msg : 'Bạn không có quyền truy cập'})
      }
    } catch (error) {
      if(error instanceof TokenExpiredError){
        return  res.status(403).json({status: 403,message: 'Token hết hạn'})
  
        }
    }
  }
}
