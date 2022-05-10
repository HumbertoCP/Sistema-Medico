import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpecialityModel {
    /* 
        'Alergologia',
        'Angiologia', 
        'Buco maxilo',
        'Cardiologia clínca',
        'Cardiologia infantil',
        'Cirurgia cabeça e pescoço',
        'Cirurgia cardíaca',
        'Cirurgia de torax'
    */

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    speciality: string
}