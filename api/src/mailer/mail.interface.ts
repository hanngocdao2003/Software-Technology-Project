import { Address } from "nodemailer/lib/mailer"

export class SendEmailDto  {
    email: string
    numChair: number
    nameChair: string
    price: number
    date: string
    trip: string
}