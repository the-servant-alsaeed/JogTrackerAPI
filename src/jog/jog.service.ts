import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Jog} from "./schemas/jog.schema";
import {Query} from 'express-serve-static-core';


@Injectable()
export class JogService {
    constructor(
        @InjectModel(Jog.name)
        private jogModel: mongoose.Model<Jog>
    ) {}

    async findAll(query: Query): Promise<Jog[]> {

        const resultsPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resultsPerPage * (currentPage - 1);

        const jogs = await this.jogModel.find().limit(resultsPerPage).skip(skip);
        return jogs;
    }

    async create(jog: Jog): Promise<Jog> {
        const response = await this.jogModel.create(jog);
        return response;
    }

    async findById(id: string): Promise<Jog> {
        const isValidId = mongoose.isValidObjectId(id);

        const jog = await this.jogModel.findById(id);

        if(!jog) {
            throw new NotFoundException('Jog not found.');
        }

        if(!isValidId) {
            throw new BadRequestException('Please enter a valid id.');
        }

        return jog;
    }

    async updateById(id: string, jog: Jog): Promise<Jog> {
        return await this.jogModel.findByIdAndUpdate(id, jog, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(id: string): Promise<Jog> {
        return await this.jogModel.findByIdAndDelete(id);
    }
}
