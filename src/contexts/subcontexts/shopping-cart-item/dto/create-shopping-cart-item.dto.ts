import { IsNumber, IsString, Min, MinLength } from 'class-validator';
export class CreateShoppingCartItemDto {
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsString()
  @MinLength(5)
  product: string;

  @IsString()
  @MinLength(5)
  shoppingCart: string;
}
