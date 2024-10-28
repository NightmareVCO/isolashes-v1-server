import { IsNumber, IsString } from 'class-validator';

export class CreateOrdersItemDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  product: string;

  @IsString()
  order: string;
}
