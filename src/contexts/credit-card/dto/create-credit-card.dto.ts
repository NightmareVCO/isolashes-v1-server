import { IsString, MinLength } from 'class-validator';

export class CreateCreditCardDto {
  @IsString()
  @MinLength(16)
  number: string;

  @IsString()
  expiration: string;

  @IsString()
  @MinLength(3)
  cvv: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;
}
