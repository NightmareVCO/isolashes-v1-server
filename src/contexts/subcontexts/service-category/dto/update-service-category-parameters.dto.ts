import { IsString, IsUUID } from 'class-validator';

export class UpdateServiceCategoryParametersDto {
  @IsUUID('4')
  @IsString()
  id: string;
}
