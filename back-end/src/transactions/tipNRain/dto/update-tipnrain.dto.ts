import { PartialType } from '@nestjs/mapped-types'
import { CreateTipNRainDto } from './create-tipnrain.dto'

export class UpdateTipNRainDto extends PartialType(CreateTipNRainDto) { }
