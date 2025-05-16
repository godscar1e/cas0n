import { IsString, IsNumber, IsBoolean, Min } from 'class-validator'
import { Decimal } from '@prisma/client/runtime/library'

export class RouletteSpinDto {

	@IsString()
	userId: string

	@IsString()
	username: string

	@IsNumber({ maxDecimalPlaces: 2 }, { message: 'Amount must be a number with up to 2 decimal places' })
	@Min(0, { message: 'Amount must be non-negative' })
	betAmount: number

	@IsBoolean()
	isWin: boolean

	@IsNumber({ maxDecimalPlaces: 2 }, { message: 'Amount must be a number with up to 2 decimal places' })
	@Min(0, { message: 'Amount must be non-negative' })
	amountOfWin: number

	toBetAmountDecimal(): Decimal {
		return new Decimal(this.betAmount.toFixed(2))
	}

	toAmountOfWinDecimal(): Decimal {
		return new Decimal(this.amountOfWin.toFixed(2))
	}
}