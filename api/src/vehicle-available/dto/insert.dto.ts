import { IsDate, IsNotEmpty, IsString, isString } from "class-validator";

export class InsertVehicleDTO{
    @IsString()
    @IsNotEmpty()
    licensePlate: string
    
    @IsString()
    @IsNotEmpty()
    time : string

    @IsString()
    @IsNotEmpty()
    timeIntend : string
    
    @IsDate()
    date : string

    @IsNotEmpty()
    @IsString()
    departure_location

    @IsNotEmpty()
    @IsString()
    destination
    
    @IsNotEmpty()
    tradeId: number
    @IsString()
    @IsNotEmpty()
    ticketPrice : number
}