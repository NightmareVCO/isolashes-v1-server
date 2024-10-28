import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateReceiptDto {
  @IsOptional()
  @IsString()
  user: string;

  @IsOptional()
  @IsString()
  order: string;

  @IsOptional()
  @IsString()
  branch: string;

  @IsOptional()
  @IsString()
  appointment: string;

  @IsNumber()
  total: number;

  @IsString()
  paymentMethod: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  userName: string;

  @IsOptional()
  @IsString()
  @MinLength(9)
  userPhone: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  userEmail: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  employeeName: string;

  @IsOptional()
  services: string;

  @IsString()
  date: string;

  @IsBoolean()
  inPlace: boolean;
}
