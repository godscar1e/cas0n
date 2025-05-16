import { IsString, IsNumber, Min } from 'class-validator'
import { Decimal } from '@prisma/client/runtime/library'

export class WithdrawalsDto {
	@IsString()
	userId: string

	@IsString()
	transactionId: string

	@IsNumber({ maxDecimalPlaces: 2 }, { message: 'Amount must be a number with up to 2 decimal places' })
	@Min(0, { message: 'Amount must be non-negative' })
	amount: number

	@IsString()
	status: string

	toPrismaDecimal(): Decimal {
		return new Decimal(this.amount.toFixed(2))
	}
}