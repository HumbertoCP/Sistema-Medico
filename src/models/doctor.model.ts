import { HttpException, HttpStatus } from '@nestjs/common';
import { IsPostalCode } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from 'typeorm';
import { SpecialityModel } from './speciality.model'

@Entity()
export class DoctorModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120 })
    name: string;

    @Column({ unique: true })
    crm: string

    @ManyToMany(() => SpecialityModel, { cascade: true })
    @JoinTable()
    speciality: SpecialityModel[]

    @Column()
    phoneNumber: string

    @Column()
    landlineNumber: string

    @Column()
    @IsPostalCode('BR')
    postalCode: string

    @Column({ default: null })
    state: string

    @Column({ default: null })
    city: string
    
    @Column({ default: null })
    district: string

    @Column({ default: null })
    street: string

    @Column({ default: true, select: false })
    isActive: boolean

    @BeforeInsert()
    beforeInsert(){
        if(!this.speciality || this.speciality.length < 2){
            throw new Error('Um médico precisa ter no mínimo duas especialidades')
        }         
    }

    @BeforeUpdate()
    beforeUpdate(){
        if(this.speciality.length < 2){
            throw new Error('Um médico precisa ter no mínimo duas especialidades')
        }
    }
}
