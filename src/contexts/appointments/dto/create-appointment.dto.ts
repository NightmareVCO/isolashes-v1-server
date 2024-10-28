import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @MinLength(5)
  fullName: string;

  @IsNumberString()
  @MinLength(10)
  phone: string;

  @IsString()
  @IsEmail()
  @MinLength(5)
  email: string;

  @IsString()
  @MinLength(5)
  date: string;

  @IsString()
  @MinLength(5)
  hours: string;

  @IsString()
  @MinLength(5)
  service: string;

  @IsString()
  @MinLength(5)
  branch: string;

  @IsOptional()
  @IsString()
  receipt: string;
}
