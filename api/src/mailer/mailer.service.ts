import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import {ConfigService} from '@nestjs/config'
import { SendEmailDto } from './mail.interface';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
    constructor(private readonly configService: ConfigService,
                // private mailerService: MailerService,
    ){}
    getTransports(){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            // port: 587,
            // secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user:  this.configService.get<string>('MAIL_USER'),
                pass: this.configService.get<string>('MAIL_PASSWORD'),
            },
        });
        return transporter
    }
    async sendMail(dto: SendEmailDto){
        let info = await this.getTransports().sendMail({
            from : `Ứng dụng đặt vé <${this.configService.get<string>('MAIL_USER')}>`,
            to: dto.email,
            subject: 'ĐẶT VÉ THÀNH CÔNG',
            text :'Bạn đã đặt vé thành công',
            html: `
                <p>Xin chào <strong>${dto.email}</strong>, cảm ơn bạn đã chọn và sử dụng ứng dụng của chúng tôi</p>
                <ul>
                <li style='margin-bottom: 5px'>Hành trình: ${dto.trip}</li>
                  <li style='margin-bottom: 5px'>Thời gian: ${dto.date}</li>\
                  <li style='margin-bottom: 5px'>Số ghế: ${dto.nameChair}</li>
                  <li style='margin-bottom: 5px'>Số lượng: ${dto.numChair}</li>
                  <li style='margin-bottom: 5px'>Số tiền: ${dto.price} VNĐ</li>
                </ul>
                <strong style='margin-bottom: 10px'>Cảm ơn quý khách!!!</strong>
              `
        })
    }
}