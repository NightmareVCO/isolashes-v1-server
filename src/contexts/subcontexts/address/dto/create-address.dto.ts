import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  zipCode: string;

  @IsOptional()
  owner: string;
}
