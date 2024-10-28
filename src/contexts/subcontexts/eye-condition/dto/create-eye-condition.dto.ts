import { IsString, MinLength } from 'class-validator';

export class CreateEyeConditionDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsString()
  @MinLength(5)
  customer: string;
}
