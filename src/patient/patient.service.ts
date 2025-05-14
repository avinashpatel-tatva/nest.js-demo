import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientResponse } from '../common/dto/patient-response.dto';
import { Patients } from 'src/common/db/patient';
import { PatientRequest } from 'src/common/dto/patient-request.dto';
import { PatientAlreadyDefinedException } from 'src/common/exceptions/patient-already-defined.exception';

@Injectable()
export class PatientService {
  getPatientById(patientId: number): PatientResponse {
    const patient: PatientResponse | undefined = Patients.find(
      (patient) => patient.id == patientId,
    );
    if (!patient) throw new NotFoundException('Patient not found!!');
    return patient;
  }

  getPatient(): PatientResponse[] {
    return Patients;
  }

  createPatient(patientRequest: PatientRequest) {
    let patient: PatientResponse | undefined = Patients.find(
      (patient) =>
        patient.name.toLowerCase() === patientRequest.name.toLowerCase(),
    );
    if (patient) throw new PatientAlreadyDefinedException(patient.name);

    patient = {
      id: Patients.length + 1,
      name: patientRequest.name,
    };

    Patients.push(patient);
    return patient;
  }
}
