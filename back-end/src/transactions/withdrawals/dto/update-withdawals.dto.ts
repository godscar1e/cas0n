import { PartialType } from '@nestjs/mapped-types'
import { CreateWithdawalsDto } from './create-withdawals.dto'

export class UpdateWithdrawalsDto extends PartialType(CreateWithdawalsDto) { }
