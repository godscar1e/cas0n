import { IsNumber, IsString, Min } from 'class-validator'
import { Decimal } from '@prisma/client/runtime/library'

export class DoubleBetDto {
	@IsString()
	gameId: string

	@IsString()
	userId: string

	@IsNumber({ maxDecimalPlaces: 2 }, { message: 'Amount must be a number with up to 2 decimal places' })
	@Min(0, { message: 'Amount must be non-negative' })
	betAmount: number

	@IsString()
	betValue: string

	toBetAmountDecimal(): Decimal {
		return new Decimal(this.betAmount.toFixed(2))
	}
}