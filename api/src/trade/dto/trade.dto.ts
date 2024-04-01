import { IsNotEmpty, IsNumber } from "class-validator"

export class TradeDTO {

    @IsNotEmpty()
    name : string

    @IsNotEmpty()
    description :  string

    @IsNotEmpty()
    numChair : number
}