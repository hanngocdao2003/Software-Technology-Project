import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketDTO } from './dto/ticket.dto';
import { parse } from 'date-fns';
import { CT_Ticket } from './dto/CT.ticket.dto';
import { BuyDTO } from 'src/book-ticket/dto/byDTO';
import { checkDTO } from 'src/book-ticket/dto/checkDTO';

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
        const ct_Ticket_create = await this.prismaService.cT_Ticket.create({
            data:{
                name_customer :'',
                email_customer:'',
                phone_customer : "",
                ticketId : ticket.id

            }
        })
        // const parseDate = await parse(ct_Ticket.departure_time,TicketService.DateFormat, new Date())
        
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
    async checkTicket(checkDTO : checkDTO){
        const arr = checkDTO.chair.slice(1, -1).split(',').map(item => item.trim());
        for (const chair of arr) {
            try{
                const ticket = await this.prismaService.ticket.findFirst({
                    where :{
                        chair: chair,
                        vehicleId : + checkDTO.idVehicle
                    }
                })
                if(!ticket){
                    return {status: 500, msg: 'Vé không tồn tại'}

                }
                if(ticket.isBougth){
                    return {status: 500, msg: 'Vé đã được mua'}
                }
                else{
                    return {status: 200, msg : 'Vé chưa được mua'}
                }
            }
            catch(error){
                console.error(`Error updating ticket with chair ${chair}: ${error}`);

            }
            
        }

    }
    async byTicket(buyDTO: BuyDTO) {
        const arr = buyDTO.chair.slice(1, -1).split(',').map(item => item.trim());
        console.log(arr);
        const check = await this.checkTicket({chair:  buyDTO.chair ,idVehicle:  buyDTO.idVehicle.toString()})
        if(check.status !==200){
            return check;
        }
        for (const chair of arr) {
            console.log(chair);
            try {
                const idTicket =  await this.prismaService.ticket.findFirst({
                    select :{
                        id: true
                    },
                    where: {
                        chair : chair,
                        vehicleId : +buyDTO.idVehicle
                    }
                })
                if(!idTicket){
                    return {status : 500, msg : 'Id vé không tồn tại'}

                }
    
                // Cập nhật thông tin vé
                const updatedTicket = await this.prismaService.ticket.update({
                    where: {
                        id: +idTicket.id // hoặc sử dụng `chair` thay vì `id` nếu chair là duy nhất
                    },
                    data: {
                        isBougth: true,
                        userId: +buyDTO.idUser
                    }
                });
                const updatedCTTicket =  await this.prismaService.cT_Ticket.updateMany({
                    where :{
                        ticketId : +idTicket.id
                    },
                    data: {
                        phone_customer : buyDTO.phone_customer,
                        email_customer: buyDTO.email_customer,
                        name_customer : buyDTO.name_customer
                    }
                })
                if(updatedCTTicket && updatedTicket){
                    return {status: 200, msg:'Thành công'}
                }
            } catch (error) {
                console.error(`Error updating ticket with chair ${chair}: ${error}`);
            }
        }
    }
    
    
}