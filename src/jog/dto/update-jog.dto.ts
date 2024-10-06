import {IsDate, IsNumber, IsObject, IsOptional} from "class-validator";
import {Type} from "class-transformer";

class Location{
    @IsOptional()
    @IsNumber()
    lat: number;

    @IsOptional()
    @IsNumber()
    lon: number;
}

export class UpdateJogDto{
    @IsOptional()
    @IsNumber()
    readonly userId: number;

    @IsOptional()
    @IsNumber()
    readonly time: number;

    @IsOptional()
    @IsNumber()
    readonly distance: number;

    @IsOptional()
    @IsDate()
    readonly date: Date;

    @IsOptional()
    @IsObject()
    @Type(() => Location)
    readonly location: Location;
}
