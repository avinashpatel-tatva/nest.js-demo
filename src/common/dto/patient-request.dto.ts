import { IsNotEmpty, IsString, Length } from 'class-validator';

export class PatientRequest {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  name: string;
}
