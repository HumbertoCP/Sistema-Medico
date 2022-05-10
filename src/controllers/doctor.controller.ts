import { SpecialityModel } from './../models/speciality.model';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { DoctorModel } from 'src/models/doctor.model';
import { DoctorSchema } from 'src/schemas/doctor.schema';
import { instanceToPlain } from 'class-transformer';
import { ApiResponse } from '@nestjs/swagger';

const postalCode = require('busca-cep');

@Controller('/doctors')
export class DoctorController {
    constructor(
        @InjectRepository(DoctorModel) private model: Repository<DoctorModel>,
    ) { }

    @Post()
    public async create(
        @Res() res,
        @Body() body: DoctorSchema
    ): Promise<any> {
        try {
            var adressResponse = postalCode(body.postalCode, { sync: true });
            if (adressResponse.hasError) {
                console.log(`Erro: statusCode ${adressResponse.statusCode} e mensagem ${adressResponse.message}`);
            }

            let doctor = new DoctorModel()
            doctor.name = body.name //This avoids the user passing isActive = false, or another any other parameter we do not want the user to be able to alter
            doctor.crm = body.crm
            doctor.phoneNumber = body.phoneNumber
            doctor.landlineNumber = body.landlineNumber
            doctor.postalCode = body.postalCode
            doctor.city = adressResponse.localidade
            doctor.state = adressResponse.uf
            doctor.district = adressResponse.bairro
            doctor.street = adressResponse.logradouro

            // Receives de ID from speciality previusly registered => "specialityID": [1, 2, 3, 4]
            doctor.speciality = await Promise.all(body.specialityID.map(async (element: number) => {

                // Search this id on the table of specialty and returns to doctor.speciality
                let spec = await getRepository(SpecialityModel)
                    .createQueryBuilder("speciality_model")
                    .where("speciality_model.id = :element", { element })
                    .getMany()

                let specialities = instanceToPlain(spec)[0] // doctor.speciality need a object so instanceToPlain turns SpecialityModel into object, the [0] is because it returns an array of 1 item only
                
                if(specialities == null){
                    throw new Error('O médico contém alguma(s) especialidade(s) inexistente(s)!')
                }

                return specialities
            }))

            const result = await this.model.save(doctor)
            res.send({
                status: 'success',
                data: result
            })
        }
        catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message
            });
        }
    }

    @Get(':id')
    public async getOne(
        @Res() res,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
        try {

            const doctor = await getRepository(DoctorModel)
                .createQueryBuilder("doctor_model")
                .leftJoinAndSelect("doctor_model.speciality", "speciality_model")
                .where("doctor_model.id = :id", { id })
                .andWhere("doctor_model.isActive = 1")
                .getOne()

            if (!doctor) {
                throw new Error(`No doctor was found with this id: ${id}`);
            }

            res.send({
                status: 'success',
                data: doctor
            })
        }
        catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err.message
            });
        }
    }

    @Get()
    public async getAll(@Req() request, @Res() res,): Promise<any> {
        try{
            let speciality_id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // Needs refactoring
            if (request.query.speciality_id) {
                speciality_id = request.query.speciality_id
                delete request.query.speciality_id
            }

            let doctor
            if(speciality_id){
                doctor = await getRepository(DoctorModel)
                .createQueryBuilder("doctor_model")
                .leftJoinAndSelect("doctor_model.speciality", `speciality_model`)
                .where("doctor_model.isActive = 1")
                .andWhere(`speciality_model.id  IN (${speciality_id})`)
                .andWhere(request.query)
                .getMany()
            } else {
                doctor = await getRepository(DoctorModel)
                .createQueryBuilder("doctor_model")
                .leftJoinAndSelect("doctor_model.speciality", `speciality_model`)
                .where("doctor_model.isActive = 1")
                .andWhere(request.query)
                .getMany()
            }
            
            res.send({
                status: 'success',
                data: doctor
            })
        }
        catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err.message
            });
        }
    }

    @Patch(':id')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: DoctorSchema,
        @Res() res
    ): Promise<any> {
        try {
            const doctor = await this.model.createQueryBuilder("doctor_model")
                .leftJoinAndSelect("doctor_model.speciality", `speciality_model`)
                .where("doctor_model.isActive = 1")
                .andWhere("doctor_model.id = :id", { id })
                .getOne()

            if (!doctor) {
                throw new Error(`No doctor was found with this id: ${id}`);
            }

            await this.model.update({ id }, body);

            res.send({
                status: 'success',
                data: doctor
            })
        }
        catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err.message
            });
        }
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number, @Res() res): Promise<any> {
        const doctor = await this.model.findOne({ where: { id } });

        try {
            if (!doctor) {
                throw new Error(`No doctor was found with this id: ${id}`);
            }

            //await this.model.delete(id);
            await this.model.update({ id }, { isActive: false });

            res.send({
                status: 'success',
                data: null
            });
        }
        catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err.message
            });
        }
    }
}
