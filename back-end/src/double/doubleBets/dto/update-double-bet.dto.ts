import { PartialType } from '@nestjs/mapped-types'
import { CreateDoubleBetDto } from './create-double-bet.dto'

export class UpdateDoubleBetDto extends PartialType(CreateDoubleBetDto) { }
