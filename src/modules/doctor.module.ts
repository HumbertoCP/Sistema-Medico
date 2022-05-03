import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from 'src/controllers/doctor.controller';
import { DoctorModel } from 'src/models/doctor.model';

@Module({
    imports: [TypeOrmModule.forFeature([DoctorModel])],
    controllers: [DoctorController],
})
export class DoctorModule { }
