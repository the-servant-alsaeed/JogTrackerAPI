import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


@Schema({
    timestamps: true,
})

export class Jog {
    @Prop()
    time: number;

    @Prop()
    distance: number;

    @Prop({default: Date.now})
    date: Date;

    @Prop({type: Object})
    location: {
        lat: number;
        lon: number;
    }
}

export const JogSchema = SchemaFactory.createForClass(Jog);
