import { Module } from '@nestjs/common';
import { PatientModule } from './patient/patient.module';
import { PediatricianModule } from './pediatrician/pediatrician.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PatientModule, PrismaModule],
})
export class AppModule {}
