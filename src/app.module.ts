import { Module } from '@nestjs/common';
import { PatientModule } from './patient/patient.module';
import { PediatricianModule } from './pediatrician/pediatrician.module';

@Module({
  imports: [PatientModule],
})
export class AppModule {}
