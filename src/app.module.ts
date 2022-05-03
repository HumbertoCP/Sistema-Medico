import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [DoctorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
