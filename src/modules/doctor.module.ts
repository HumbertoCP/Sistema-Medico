import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from './../controllers/doctor.controller';
import { DoctorModel } from './../models/doctor.model';

@Module({
    imports: [TypeOrmModule.forFeature([DoctorModel])],
    controllers: [DoctorController],
})
export class DoctorModule {  }
