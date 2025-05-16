import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TipNRainDto } from './tipnrain.dto'
import { BalanceService } from 'src/balance/balance.service'
import { BalanceDto } from 'src/balance/balance.dto'
import { Decimal } from '@prisma/client/runtime/library'

@Injectable()
export class TipNRainService {
	constructor(private prisma: PrismaService,
		private balanceService: BalanceService,
	) { }

	async getById(id: string) {
		return this.prisma.tipnRain.findUnique({
			where: {
				id,
			},
		})
	}
	
	async create(dto: TipNRainDto) {
		const tipnrain = {
			userId: dto.userId,
			type: dto.type,
			currency: dto.currency,
			userToId: dto.userToId,
			amount: dto.amount,
			isPublic: dto.isPublic
		}

		// Создаём запись
		const createdTip = await this.prisma.tipnRain.create({
			data: tipnrain,
		})

		// Получаем баланс получателя
		const recipientBalance = await this.balanceService.getByUserId(dto.userToId)

		if (recipientBalance) {
			// Обновляем баланс, если уже есть
			await this.prisma.userBalance.update({
				where: { userId: dto.userToId },
				data: {
					balance: new Decimal(recipientBalance.balance).plus(dto.amount)
				},
			})
		} else {
			const newBalanceDto = new BalanceDto()
			newBalanceDto.userId = dto.userToId
			newBalanceDto.balance = dto.amount

			await this.balanceService.create(newBalanceDto)
		}

		return createdTip
	}


	async getByUserId(userId: string) {
		return this.prisma.tipnRain.findMany({
			where: { userId },
		})
	}
}