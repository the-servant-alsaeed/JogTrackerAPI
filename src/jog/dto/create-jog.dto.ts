import {IsDate, IsNotEmpty, IsNumber, IsObject} from "class-validator";
import {Type} from "class-transformer";

class Location{
    @IsNotEmpty()
    @IsNumber()
    lat: number;

    @IsNotEmpty()
    @IsNumber()
    lon: number;
}

export class CreateJogDto{
    @IsNotEmpty()
    @IsNumber()
    readonly time: number;

    @IsNotEmpty()
    @IsNumber()
    readonly distance: number;

    @IsNotEmpty()
    @IsDate()
    readonly date: Date;

    @IsNotEmpty()
    @IsObject()
    @Type(() => Location)
    readonly location: Location;
}
