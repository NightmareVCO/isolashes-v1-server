import { IsString, MinLength } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;
}
