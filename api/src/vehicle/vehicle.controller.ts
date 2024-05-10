import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { InsertVehicleDTO } from './dto/insert.dto';

@Controller('vehicle')
export class VehicleController {
    constructor(
        private vehicleService : VehicleService
    ){}
    @Get('all')
    get(@Query('page') page : number){
        return this.vehicleService.getAll(page)
    }
    // insert
    @Post('add-vehicle')
    @UsePipes(InsertVehicleDTO)
    add(@Body() insertDTO: InsertVehicleDTO ){
        return this.vehicleService.addVehicle(insertDTO)
    }

    @Post('update-vehicle/:id')
    @UsePipes(InsertVehicleDTO)
    update(@Body()  insertDTO : InsertVehicleDTO, @Param('id') id : number){
        return this.vehicleService.updateVehicle(insertDTO, id)
    }

    @Delete('/:id')
    delete(@Param('id') id : number){
        return this.vehicleService.deleteVehicle(id)
    }
}