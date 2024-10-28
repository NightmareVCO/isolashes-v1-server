import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @MinLength(5)
  serviceCategory: string;
}
