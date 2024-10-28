import { IsString, IsUUID } from 'class-validator';

export class UpdateAppointmentParametersDto {
  @IsUUID('4')
  @IsString()
  id: string;
}
