import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketDTO } from './dto/ticket.dto';
import { parse } from 'date-fns';
import { CT_Ticket } from './dto/CT.ticket.dto';

@Injectable()
export class TicketService {
    private static  DateFormat = 'dd-MM-yyyy'
    constructor(
        private prismaService: PrismaService
    ){}
   async add(licensePlate: string,ticketDTO : TicketDTO, ct_Ticket: CT_Ticket){
        const check = await this.prismaService.ticket.findFirst({
            where: {
                chair: ticketDTO.chair,
                vehicle:{
                    time:{not: ct_Ticket.departure_time},
                    licensePlate:{not: licensePlate}
                }
            },
            include:{
                vehicle: true
            }
        })
        if(check){
            return new ForbiddenException('Ghế này đã tồn tại')
        }
        const admin = await this.prismaService.user.findFirst({
            where:{
                isAdmin:true
            }
        })
       const ticket = await this.prismaService.ticket.create({
            data: {
                chair: ticketDTO.chair,
                name: ticketDTO.name,
                price: ticketDTO.price,
                userId: admin.id, // ID của người dùng
                vehicleId: ticketDTO.vehicleId // ID của phương tiện

            }
        })
        const parseDate = await parse(ct_Ticket.departure_time,TicketService.DateFormat, new Date())
        
        return ticket
    }
    async update(updateDTO : TicketDTO , ticketId: number){
        let ticket = await this.prismaService.ticket.findUnique({
            where:{
                id : ticketId
            }
        })
        if(!ticket ){
            return new ForbiddenException('Không có vé ')
        }
        const data = Object.fromEntries(Object.entries(updateDTO).filter(([k,v])=> v!== undefined && v!==' '))
        return this.prismaService.ticket.update({
            where: {
                id: +ticketId
            },
            data: {
                ...data
            }
        })
    }
}