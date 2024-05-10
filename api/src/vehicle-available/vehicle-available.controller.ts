import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { VehicleAvailableService } from './vehicle-available.service';
import { InsertVehicleDTO } from './dto/insert.dto';

@Controller('vehicle-depart')
export class VehicleAvailableController {
    constructor(
        private vehicleService : VehicleAvailableService
    ){}
    @Get('all')
    get(@Query('page') page : number){
        return this.vehicleService.getAll(page)
    }
    // insert
    @Post('add-vehicle-depart')
    @UsePipes(InsertVehicleDTO)
    add(@Body() insertDTO: InsertVehicleDTO ){
        return this.vehicleService.addVehicleAvailable(insertDTO)
    }

    @Post('update-vehicle-depart/:id')
    @UsePipes(InsertVehicleDTO)
    update(@Body()  insertDTO : InsertVehicleDTO, @Param('id') id : number){
        return this.vehicleService.updateVehicleAvailable(insertDTO, id)
    }

    @Delete('/:id')
    delete(@Param('id') id : number){
        return this.vehicleService.deleteVehicle(id)
    }
}