import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class TipNRainDto {
	@IsString()
	userId: string

	@IsString()
	type: string

	@IsString()
	currency: string

	@IsString()
	userToId: string

	@IsNumber({})
	amount: number

	@IsBoolean()
	isPublic: boolean
}