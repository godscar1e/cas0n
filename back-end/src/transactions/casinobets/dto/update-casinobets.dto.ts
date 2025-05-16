import { PartialType } from '@nestjs/mapped-types'
import { CreateCasinoBetsDto } from './create-casinobets.dto'

export class UpdateCasinoBetsDto extends PartialType(CreateCasinoBetsDto) { }
