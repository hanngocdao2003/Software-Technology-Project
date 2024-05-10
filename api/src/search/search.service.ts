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
        // Preprocessing
        let filterData = Object.fromEntries(Object.entries(searchDTO).filter(([key, value]) => value !== undefined && value !==''))
        
        if(filterData['date']){
            const parseDate = parse(filterData['date'], SearchService.DateFormat, new Date())
            filterData = {...filterData,date: parseDate}
            console.log(parseDate);
            
        }
        console.log(filterData);
        
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
            }
        })
        
        return vehicles
        
    }
}