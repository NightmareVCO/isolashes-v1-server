import { IsString, IsUUID } from 'class-validator';

export class UpdateProductParameterDto {
  @IsUUID()
  @IsString()
  id: string;
}
