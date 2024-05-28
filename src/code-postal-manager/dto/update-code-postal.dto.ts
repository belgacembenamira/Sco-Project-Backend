import { PartialType } from '@nestjs/mapped-types';
import { CreateCodePostalDtoManger } from './create-code-postal.dto';

export class UpdateCodePostalDtoManager extends PartialType(CreateCodePostalDtoManger) {}
