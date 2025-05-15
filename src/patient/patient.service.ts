import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientResponse } from '../common/dto/patient-response.dto';
import { PatientRequest } from 'src/common/dto/patient-request.dto';
import { PatientAlreadyDefinedException } from 'src/common/exceptions/patient-already-defined.exception';
import { PrismaService } from '../prisma/prisma.service';
import { patient } from '../../generated/prisma/index';
import { equal } from 'assert';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPatientById(patientId: number): Promise<PatientResponse> {
    console.log('1');
    const patient = await this.prismaService.patient.findUnique({
      where: { id: patientId },
    });
    if (!patient) throw new NotFoundException('Patient not found!!');
    return patient;
  }

  async getPatient(): Promise<PatientResponse[]> {
    console.log('2');
    return this.prismaService.patient.findMany();
  }

  async createPatient(
    patientRequest: PatientRequest,
  ): Promise<PatientResponse> {
    console.log('3');
    const existing = await this.prismaService.patient.findFirst({
      where: {
        name: {
          equals: patientRequest.name.toLowerCase(),
          mode: 'insensitive',
        },
      },
    });
    console.log(existing);
    if (existing) {
      throw new PatientAlreadyDefinedException(patientRequest.name);
    }

    return this.prismaService.patient.create({
      data: {
        name: patientRequest.name,
      },
    });
  }

  async deletePatient(patientId: number): Promise<void> {
    console.log('4');
    const patient = await this.prismaService.patient.findUnique({
      where: { id: patientId },
    });
    if (!patient) throw new NotFoundException('Patient not found!!');

    await this.prismaService.patient.delete({
      where: { id: patientId },
    });
  }

  async updatePatient(
    patientId: number,
    patientRequest: PatientRequest,
  ): Promise<PatientResponse> {
    console.log('5');
    const patient = await this.prismaService.patient.findUnique({
      where: { id: patientId },
    });
    if (!patient) throw new NotFoundException('Patient not found!!');

    return this.prismaService.patient.update({
      where: { id: patientId },
      data: {
        name: patientRequest.name,
      },
    });
  }
}
