import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { AuthDto } from './auth.dto'
import { Transform } from 'class-transformer'

export class RegisterDto extends AuthDto {
	@IsString()
	username?: string

	@Transform(() => undefined)
	isActive?: any

	@IsString()
	@IsOptional()
	referralCode?: string
}
