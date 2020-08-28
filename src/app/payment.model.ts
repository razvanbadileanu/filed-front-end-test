import {IsInt, IsDate, Min, Max, IsPositive, IsString } from "class-validator";

export class Payment {
    @IsPositive()
    amount: number;

    @IsString()
    cardholder: string;

    @IsString()
    creditCardNumber: string;

    @IsDate()
    expirationDate: Date;

    @IsInt() @Min(100) @Max(999)
    securityCode:number;
}
