import { Injectable } from '@nestjs/common';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Injectable()
export class BookTicketService {
    constructor(
        private readonly vehicleService : VehicleService
    ){}
    getVehicle(id : string){
        return this.vehicleService.getVehicle(id)
    }
}
