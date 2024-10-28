import { PartialType } from '@nestjs/mapped-types';

import { CreateEyeConditionDto } from './create-eye-condition.dto';

export class UpdateEyeConditionDto extends PartialType(CreateEyeConditionDto) {}
