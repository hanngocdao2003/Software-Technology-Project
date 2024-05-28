import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertVehicleDTO } from './dto/insert.dto';

@Injectable()
export class VehicleService {
    constructor (
        private prismaService : PrismaService,
        ){}
        private static  DateFormat = 'dd-MM-yyyy'
        private static recordSize =2
        async getAll(page: number){
            const startIndex = (+ page -1) * VehicleService.recordSize
    const vehicles = await this.prismaService.vehicle.findMany({
        skip :startIndex,
        take: VehicleService.recordSize
    })
    return vehicles
    }
    async getVehicle(id : string){
        const vehicle = await this.prismaService.vehicle.findUnique({
            where:{
                id: +id
            },
            include: {
                trade: true,
                // tickets : true
            }
        })
        
        if(!vehicle){
            return new HttpException('Not find vehicle', HttpStatus.BAD_REQUEST)
        }
        return {...vehicle}
    }
    async addVehicle(insertDTO: InsertVehicleDTO){
        
    }
    async updateVehicle(updateDTO: InsertVehicleDTO, id: number){
    }
    async deleteVehicle( id: number){
    }
}