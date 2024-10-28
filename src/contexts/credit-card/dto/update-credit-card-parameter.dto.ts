import { IsString, IsUUID } from 'class-validator';

export class UpdateCreditCardParameterDto {
  @IsUUID()
  @IsString()
  id: string;
}
