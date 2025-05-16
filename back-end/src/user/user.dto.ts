import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'


export class UserDto {
	@IsEmail()
	email: string

	@IsString()
	@IsOptional()
	name?: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	@IsString()
	@IsOptional()
	password: string

	@IsString()
	currency: string

	@IsString()
	role: string

	@IsBoolean()
	isActive: boolean

	@IsString()
	@IsOptional()
	referralCode?: string

	@IsNumber()
	experience: number

	@IsBoolean()
	isEmailVerified: boolean

	@IsBoolean()
	isBasicVerified: boolean

	@IsString()
	twoFactorSecret: string

	@IsBoolean()
	isTwoFactorVerified: boolean

	@IsString()
	verificationCode: string

}