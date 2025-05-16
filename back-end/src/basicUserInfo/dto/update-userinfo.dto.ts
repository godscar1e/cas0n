import { PartialType } from '@nestjs/mapped-types'
import { CreateUserInfoDto } from './create-userinfo.dto'

export class UpdateUserInfoDto extends PartialType(CreateUserInfoDto) { }
