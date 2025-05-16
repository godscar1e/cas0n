import {IsString } from 'class-validator'

export class UserInfoDto {
	@IsString()
	userId: string

	@IsString()
	country: string

	@IsString()
	name: string

	@IsString()
	lastName: string

	@IsString()
	dateOfBirth: string

}