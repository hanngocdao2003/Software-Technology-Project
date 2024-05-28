import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchDTO } from './dto/search.dto';
import { parse } from 'date-fns';

@Injectable()
export class SearchService {
    private static  DateFormat = 'dd-MM-yyyy'
    constructor(
        private prismaService: PrismaService
    ){
    }
    get(searchDTO: SearchDTO){
        let parseDate = null
        // Preprocessing
        let filterData = Object.fromEntries(Object.entries(searchDTO).filter(([key, value]) => value !== undefined && value !==''))
        
        if(filterData['date']){
            parseDate = parse(filterData['date'], SearchService.DateFormat, new Date())
            filterData = {...filterData,date: parseDate}
            console.log(parseDate);
            
        }
        console.log(filterData);
        if (!parseDate || isNaN(parseDate.getTime())) {
            // Trả về thông báo nếu ngày không hợp lệ
            return [];
        }
        const vehicles = this.prismaService.vehicle_Availabel.findMany({
            select:{
                id: true,
                licensePlate: true,
                time: true,
                timeIntend: true,
                price: true,
                date: true,
                departure_location: true,
                destination: true,
                TradeId: true,
            },
            where: {
                ...filterData

            },
            
        })
        return vehicles
       }
        
        
    
}