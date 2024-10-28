import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsUUID()
  user: string;

  @IsOptional()
  @IsUUID()
  address: string;

  @IsOptional()
  @IsUUID()
  receipt: string;

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
  @MinLength(5)
  userEmail: string;

  @IsNumber()
  total: number;

  @IsBoolean()
  delivered: boolean;

  @IsBoolean()
  completed: boolean;

  @IsString()
  dateOrdered: string;

  @IsOptional()
  @IsString()
  dateDelivered: string;

  @IsOptional()
  @IsString()
  dateCompleted: string;

  @IsBoolean()
  inPlace: boolean;

  @IsString()
  products: string;
}
