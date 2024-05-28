import { IsDate, IsNotEmpty, IsString, isString } from "class-validator";

export class InsertVehicleDTO{
    @IsString()
    @IsNotEmpty()
    licensePlate: string
    
    
}