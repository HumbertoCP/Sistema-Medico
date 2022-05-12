import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpecialityModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    speciality: string
}