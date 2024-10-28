import { IsString, MinLength } from 'class-validator';

export class CreateServiceCategoryDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(5)
  description: string;
}
