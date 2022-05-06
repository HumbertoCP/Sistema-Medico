import { IsString, MaxLength, IsNumberString, IsPostalCode, IsPhoneNumber } from 'class-validator';
import { BeforeInsert } from 'typeorm';

export class DoctorSchema {
    @IsString()
    @MaxLength(120)
    name: string;

    @MaxLength(7)
    @IsNumberString()
    crm: string;

    specialityID: any

    @IsNumberString()
    @IsPhoneNumber('BR')
    phoneNumber: string

    @IsNumberString()
    @IsPhoneNumber('BR')
    landlineNumber: string

    @IsPostalCode('BR')
    postalCode: string

    state: string

    city: string

    district: string

    street: string
}
