import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {JogService} from "./jog.service";
import {Jog} from "./schemas/jog.schema";
import {CreateJogDto} from "./dto/create-jog.dto";
import {UpdateJogDto} from "./dto/update-jog.dto";
import {Query as ExpressQuery} from 'express-serve-static-core';

@Controller('jogs')
export class JogController {
    constructor(private jogService: JogService) {}

    @Get()
    async getAllJogs(@Query() query: ExpressQuery): Promise<Jog[]> {
        return this.jogService.findAll(query);
    }

    @Post()
    async createJog(
        @Body()
        jog: CreateJogDto
    ): Promise<Jog> {
        return this.jogService.create(jog);
    }

    @Get(':id')
    async getJog(
        @Param('id')
        id: string
    ): Promise<Jog> {
        return this.jogService.findById(id);
    }

    @Put(':id')
    async updateJog(
        @Param('id')
            id: string,
        @Body()
            jog: UpdateJogDto
    ): Promise<Jog> {
        return this.jogService.updateById(id, jog);
    }

    @Delete(':id')
    async deleteJog(
        @Param('id')
            id: string
    ): Promise<Jog> {
        return this.jogService.deleteById(id);
    }
}
