import { Module } from '@nestjs/common';
import { JogController } from './jog.controller';
import { JogService } from './jog.service';
import {JogSchema} from "./schemas/jog.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Jog', schema: JogSchema }])],
  controllers: [JogController],
  providers: [JogService]
})
export class JogModule {}
