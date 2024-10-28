import { IsString, MinLength } from 'class-validator';

export class CreateHourDto {
  @IsString()
  @MinLength(5)
  time: string;
}
