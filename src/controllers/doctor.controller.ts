import { SpecialityModel } from './../models/speciality.model';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { DoctorModel } from 'src/models/doctor.model';
import { DoctorSchema } from 'src/schemas/doctor.schema';
import { instanceToPlain } from 'class-transformer';

const postalCode = require('busca-cep');

@Controller('/doctors')
export class DoctorController {
    constructor(
        @InjectRepository(DoctorModel) private model: Repository<DoctorModel>,
    ) { }

    @Post()
    public async create(@Body() body: DoctorSchema): Promise<DoctorModel> {
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

        //console.log(body.specialityID)

        // Receives de ID from speciality previusly registered => "specialityID": [1, 2, 3, 4]
        doctor.speciality = await Promise.all(body.specialityID.map(async (element: number) => {

            // Search this id on the table of specialty and returns to doctor.speciality
            let spec = await getRepository(SpecialityModel)
                .createQueryBuilder("speciality_model")
                .where("speciality_model.id = :element", { element })
                .getMany()

            return instanceToPlain(spec)[0] // doctor.speciality need a object so instanceToPlain turns SpecialityModel into object, the [0] is because it returns an array of 1 item only
        }))

        console.log(doctor)
        return this.model.save(doctor);


    }

    @Get(':id')
    public async getOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
        //const doctor = await this.model.findOne({ where: { id } });

        const doctor = await getRepository(DoctorModel)
            .createQueryBuilder("doctor_model")
            .leftJoinAndSelect("doctor_model.speciality", "speciality_model")
            .where("doctor_model.id = :id", { id })
            .andWhere("doctor_model.isActive = 1")
            .getOne()

        if (!doctor) {
            throw new NotFoundException(`No doctor was found with this id: ${id}`);
        }

        return doctor;
    }

    @Get()
    public async getAll(@Req() request): Promise<any> {
        console.log(request.query)

        let speciality_id = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10]
        if (request.query.speciality_id) {
            speciality_id = request.query.speciality_id
            delete request.query.speciality_id
            //console.log(speciality_id)
        }

        const doctor = await getRepository(DoctorModel)
            .createQueryBuilder("doctor_model")
            .leftJoinAndSelect("doctor_model.speciality", `speciality_model` ) //  IN (${speciality_id})
            .where("doctor_model.isActive = 1")
            .andWhere(`speciality_model.id  IN (${speciality_id})`)
            .andWhere(request.query)
            //
            .getMany()

        return doctor
    }

    @Patch(':id')
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
