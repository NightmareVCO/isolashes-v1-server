import { IsString } from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  url: string;

  @IsString()
  product: string;
}
