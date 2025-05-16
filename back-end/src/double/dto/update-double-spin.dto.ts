import { PartialType } from '@nestjs/mapped-types'
import { CreateDoubleSpinDto } from './create-double-spin.dto'

export class UpdateDoubleSpinDto extends PartialType(CreateDoubleSpinDto) { }
