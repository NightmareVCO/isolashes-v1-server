import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUserIdDto {
  @IsUUID('4')
  @IsString()
  data: string;
}

export class UpdateUserEmailDto {
  @IsString()
  @IsEmail()
  data: string;
}

export class UpdateUserIdOptionalDto {
  @IsString()
  @IsUUID('4')
  @IsOptional()
  data?: string;
}
