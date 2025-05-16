import { IsNumber } from 'class-validator'

export class RouletteNumberDto {
	@IsNumber()
	number: number

}