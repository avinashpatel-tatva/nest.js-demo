import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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

  @Delete(':patientId')
  deletePatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.patientService.deletePatient(patientId);
  }

  @Put(':patientId')
  updatePatient(
    @Body(ValidationPipe) patientRequest: PatientRequest,
    @Param('patientId', ParseIntPipe) patientId: number,
  ) {
    return this.patientService.updatePatient(patientId, patientRequest);
  }
}
