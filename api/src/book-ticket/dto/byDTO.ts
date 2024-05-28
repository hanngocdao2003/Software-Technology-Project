import { IsNotEmpty } from "class-validator"

export class BuyDTO {
    @IsNotEmpty()
    idUser: number
    @IsNotEmpty()
    idVehicle: number
    @IsNotEmpty()
    chair : any
    @IsNotEmpty()
    phone_customer : string
    @IsNotEmpty()
    name_customer: string
    @IsNotEmpty()
    email_customer : string

}