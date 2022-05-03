import { IsString, MaxLength, IsNumberString, IsPostalCode, IsPhoneNumber } from 'class-validator';

export class DoctorSchema {
    @IsString()
    @MaxLength(120)
    name: string;

    @MaxLength(7)
    @IsNumberString()
    crm: string;

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
