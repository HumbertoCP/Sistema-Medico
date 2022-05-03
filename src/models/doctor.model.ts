import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DoctorModel {
  @PrimaryGeneratedColumn()
  id: number;

    @Column({ length: 120 })
    name: string;

    @Column({ unique: true })
    crm: string

    /* @Column()
    speciality: JSON */

    @Column()
    phoneNumber: string

    @Column()
    landlineNumber: string

    @Column()
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
}
