import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorModel } from 'src/models/doctor.model';
import { DoctorSchema } from 'src/schemas/doctor.schema';
//const postalCode = require('./../postalCode.js')
var postalCode = require('busca-cep');

@Controller('/doctor')
export class DoctorController {
    constructor(
        @InjectRepository(DoctorModel) private model: Repository<DoctorModel>,
    ) { }

    @Post()
    public async create(@Body() body: DoctorSchema): Promise<DoctorModel> {
        
        var adressResponse = postalCode(body.postalCode, {sync: true});
        if (adressResponse.hasError) {
            console.log(`Erro: statusCode ${adressResponse.statusCode} e mensagem ${adressResponse.message}`);
        }
        console.log(adressResponse)

        let doctor = body
        doctor.city = adressResponse.localidade
        doctor.state = adressResponse.uf
        doctor.district = adressResponse.bairro
        doctor.street = adressResponse.logradouro

        //doctor.city = 'a'
        return this.model.save(doctor);
    }

    @Get(':id')
    public async getOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<DoctorModel> {
        const doctor = await this.model.findOne({ where: { id } });

        if (!doctor) {
            throw new NotFoundException(`No doctor was found with this id: ${id}`);
        }

        return doctor;
    }

    @Get()
    public async getAll(): Promise<DoctorModel[]> {
        return this.model.find({ where: { isActive: true } });
    }

    @Put(':id')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: DoctorSchema,
    ): Promise<DoctorModel> {
        const doctor = await this.model.findOne({ where: { id } });

        if (!doctor) {
            throw new NotFoundException(`No doctor was found with this id: ${id}`);
        }

        await this.model.update({ id }, body);

        return this.model.findOne({ where: { id } });
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        const doctor = await this.model.findOne({ where: { id } });

        if (!doctor) {
            throw new NotFoundException(`No doctor was found with this id: ${id}`);
        }

        //await this.model.delete(id);
        await this.model.update({ id }, { isActive: false });

        return `Doctor deleted succesfully`;
    }
}
