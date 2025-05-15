import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientResponse } from '../common/dto/patient-response.dto';
import { Patients } from 'src/common/db/patient';
import { PatientRequest } from 'src/common/dto/patient-request.dto';
import { PatientAlreadyDefinedException } from 'src/common/exceptions/patient-already-defined.exception';

@Injectable()
export class PatientService {
  getPatientById(patientId: number): PatientResponse {
    const patient: PatientResponse | undefined = Patients.find(
      (patient) => patient.id === patientId,
    );
    if (!patient) throw new NotFoundException('Patient not found!!');
    return patient;
  }

  getPatient(): PatientResponse[] {
    return Patients;
  }

  createPatient(patientRequest: PatientRequest): PatientResponse {
    const index = Patients.findIndex(
      (patient) =>
        patient.name.toLowerCase() === patientRequest.name.toLowerCase(),
    );
    if (index !== -1)
      throw new PatientAlreadyDefinedException(patientRequest.name);
    const patient: PatientResponse = {
      id: Patients.length + 1,
      name: patientRequest.name,
    };
    Patients.push(patient);
    return patient;
  }

  deletePatient(patientId: number) {
    const index = Patients.findIndex((patient) => patient.id === patientId);
    if (index === -1) throw new NotFoundException('Patient not found!!');
    Patients.splice(index, 1);
  }

  updatePatient(
    patientId: number,
    patientRequest: PatientRequest,
  ): PatientResponse {
    const index = Patients.findIndex((patient) => patient.id === patientId);
    if (index === -1) throw new NotFoundException('Patient not found!!');
    const updatedPatient: PatientResponse = {
      id: patientId,
      name: patientRequest.name,
    };
    Patients[index] = updatedPatient;
    return updatedPatient;
  }
}
