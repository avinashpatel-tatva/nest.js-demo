import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PediatricianModule } from 'src/pediatrician/pediatrician.module';

@Module({
  imports: [PediatricianModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
