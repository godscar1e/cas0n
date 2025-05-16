import { PartialType } from '@nestjs/mapped-types'
import { CreateDepositsDto } from './create-deposits.dto'

export class UpdateDepositsDto extends PartialType(CreateDepositsDto) { }
