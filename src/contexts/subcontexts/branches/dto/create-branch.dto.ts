import { IsString, MinLength } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(5)
  address: string;

  @IsString()
  @MinLength(5)
  phone: string;

  @IsString()
  @MinLength(5)
  email: string;

  @IsString()
  @MinLength(5)
  schedule: string;

  @IsString()
  @MinLength(5)
  cover: string;
}
