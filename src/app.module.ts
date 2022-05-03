import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './modules/doctor.module';

@Module({
  imports: [DoctorModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
