import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertVehicleDTO } from './dto/insert.dto';
import {parse,isValid} from  'date-fns'
import { TicketService } from 'src/ticket/ticket.service';
import { TicketDTO } from 'src/ticket/dto/ticket.dto';
import { CT_Ticket } from 'src/ticket/dto/CT.ticket.dto';

@Injectable()
export class VehicleAvailableService {
    constructor (
        private prismaService : PrismaService,
        private ticketService : TicketService
        ){}
        private static  DateFormat = 'dd-MM-yyyy'
        private static recordSize =2
        async getAll(page: number){
            const startIndex = (+ page -1) * VehicleAvailableService.recordSize
    const vehicles = await this.prismaService.vehicle.findMany({
        skip :startIndex,
        take: VehicleAvailableService.recordSize
    })
    return vehicles
    }
    async getVehicle(id : string){
        const vehicle = await this.prismaService.vehicle_Availabel.findUnique({
            where:{
                id: +id
            },
            include: {
                trade: true,
                // tickets : true
            }
        })
        
        const tickets = await this.prismaService.ticket.findMany(
            
            {
                select:{
                    chair: true,
                    isBougth: true,
                },
                where: {
                    vehicleId : vehicle.id
        }
            }
        )
        console.log(tickets);
        
        if(!vehicle){
            return new HttpException('Not find vehicle', HttpStatus.BAD_REQUEST)
        }
        return {...vehicle, tickets}
    }
    async addVehicleAvailable(insertDTO: InsertVehicleDTO){
        const parseDate = await parse(insertDTO.date,VehicleAvailableService.DateFormat, new Date())
        if(!isValid(parseDate)){
            return new ForbiddenException('Ngày không hợp lệ')
        }
        const vehicle = await this.prismaService.vehicle_Availabel.create({
            data: {
                licensePlate :  insertDTO.licensePlate,
                time: insertDTO.time,
                date : parseDate,
                price: +insertDTO.ticketPrice,
                departure_location: insertDTO.departure_location,
                destination: insertDTO.destination,
                TradeId: +insertDTO.tradeId
            }
        })
        const numberChair =(await  this.prismaService.tradeMark.findUnique({
            where:{
                id: +insertDTO.tradeId
            }
        })).numChair
        let ticketDTO : TicketDTO
        if(numberChair <=10){
            for(let i= 0 ; i< numberChair; i++){
                 ticketDTO= {
                    chair: `A${i}`,
                    name : `Ghế A${i}`,
                    price: +insertDTO.ticketPrice,
                    userId: 0,
                    vehicleId : vehicle.id
                }
                this.ticketService.add(vehicle.licensePlate,ticketDTO, {departure_time:insertDTO.time,departure_location: insertDTO.departure_location, destination: insertDTO.destination })
            }        
        }
        else{
            const haft = numberChair/2
        console.log(haft);
        
        for(let i =1 ; i<= numberChair; i++){
            if(i <= haft){
                 ticketDTO= {
                    chair: `A${i}`,
                    name : `Ghế A${i}`,
                    price: +insertDTO.ticketPrice,
                    userId: 0,
                    vehicleId : vehicle.id
                }
            }
            else{
                ticketDTO= {
                    chair: `B${i}`,
                    name : `Ghế B${i}`,
                    price: +insertDTO.ticketPrice,
                    userId: 1,
                    vehicleId : vehicle.id
                }
            }
            this.ticketService.add(vehicle.licensePlate,ticketDTO, {departure_time:insertDTO.time,departure_location: insertDTO.departure_location, destination: insertDTO.destination })
        }
        }
        return vehicle
    }
    async updateVehicleAvailable(updateDTO: InsertVehicleDTO, id: number){
        const parseDate = parse(updateDTO.date , VehicleAvailableService.DateFormat, new Date())
        // const data = { ...updateDTO, date : parseDate, tradeId : + updateDTO.tradeId}
        // console.log(data);
        
        const vehicle = await this.prismaService.vehicle_Availabel.findUnique({
            where:{
                id: + id
            }
        })
        if(! vehicle){
            return new ForbiddenException('No-vehicle')
        }
        return this.prismaService.vehicle_Availabel.update({
            where: {
                id : + id
            },
            data:{
                licensePlate :  updateDTO.licensePlate,
                time: updateDTO.time,
                date : parseDate,
                departure_location: updateDTO.departure_location,
                destination: updateDTO.destination,
                TradeId: +updateDTO.tradeId
            }
        })
    }
   async deleteVehicle(id : number) {
        const vehicle = await this.prismaService.vehicle_Availabel.findUnique({
            where:{
                id: + id
            }
        })
        if(! vehicle){
            return new ForbiddenException('No-vehicle')
        }
        return this.prismaService.vehicle.delete({
            where:{
                id: +id
            }
        })
    }
}