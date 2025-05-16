import { PartialType } from '@nestjs/mapped-types'
import { CreateRouletteSpinNumDto } from './create-roulette-spin-num.dto'

export class UpdateRouletteSpinNumDto extends PartialType(CreateRouletteSpinNumDto) { }
