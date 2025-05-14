import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientRequest } from 'src/common/dto/patient-request.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  getPatient() {
    return this.patientService.getPatient();
  }

  @Get(':patientId')
  getPatientById(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.patientService.getPatientById(patientId);
  }

  @Post()
  createPatient(@Body(ValidationPipe) patientRequest: PatientRequest) {
    return this.patientService.createPatient(patientRequest);
  }
}
