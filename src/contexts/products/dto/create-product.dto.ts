import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  minStock: number;

  @IsString()
  @MinLength(5)
  productCategory: string;
}
