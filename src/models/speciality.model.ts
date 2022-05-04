import { DoctorModel } from 'src/models/doctor.model';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SpecialityModel {
    /* @ApiProperty({ enum: [
        'Alergologia',
        'Angiologia', 
        'Buco maxilo',
        'Cardiologia clínca',
        'Cardiologia infantil',
        'Cirurgia cabeça e pescoço',
        'Cirurgia cardíaca',
        'Cirurgia de torax'
    ]})
    speciality: string */

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    speciality: string
}