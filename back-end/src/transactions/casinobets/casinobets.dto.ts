import { IsString, IsNumber, IsDateString, Min } from 'class-validator'

export class CasinoBetsDto {
	@IsString()
	game: string

	@IsDateString()
	createdAt: string

	@IsNumber()
	@Min(0)
	amount: number

	@IsNumber()
	@Min(0)
	multiplier: number

	@IsString()
	betId: string
}