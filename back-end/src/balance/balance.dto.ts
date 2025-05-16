import { Decimal } from '@prisma/client/runtime/library'
import { IsNumber, IsString } from 'class-validator'


export class BalanceDto {
	@IsString()
	userId: string

	@IsNumber({ maxDecimalPlaces: 2 }, { message: 'Amount must be a number with up to 2 decimal places' })
	balance: number

	toBetAmountDecimal(): Decimal {
		return new Decimal(this.balance.toFixed(2))
	}

}