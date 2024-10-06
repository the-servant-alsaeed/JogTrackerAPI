import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogModule } from './jog/jog.module';
import {Mongoose} from "mongoose";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.DB_URI),
      JogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
