import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { RouletteSpinDto } from './roulette.dto'
import { plainToInstance } from 'class-transformer'
import { BalanceService } from 'src/balance/balance.service'
import { Decimal } from '@prisma/client/runtime/library'
import { BalanceDto } from 'src/balance/balance.dto'

@Injectable()
export class RouletteSpinsService {
	constructor(private prisma: PrismaService,
		private balanceService: BalanceService
	) { }

	async getById(id: string) {
		return this.prisma.rouletteSpin.findUnique({
			where: {
				id
			},
		})
	}

	async findAll(): Promise<RouletteSpinDto[]> {
		const spins = await this.prisma.rouletteSpin.findMany()

		return spins.map((spin) =>
			plainToInstance(RouletteSpinDto, {
				id: spin.id,
				userId: spin.userId,
				username: spin.username,
				betAmount: Number(spin.betAmount),
				isWin: spin.isWin,
				amountOfWin: Number(spin.amountOfWin),
				createdAt: spin.createdAt,
				updatedAt: spin.updatedAt,
			}),
		)
	}
	async create(dto: RouletteSpinDto): Promise<RouletteSpinDto> {
		return this.prisma.$transaction(async (tx) => {
			const user = await tx.user.findUnique({ where: { id: dto.userId }, include: { userBalance: true } })
			if (!user) {
				throw new NotFoundException('User not found')
			}
			if (!user.userBalance || Number(user.userBalance.balance.toString()) < dto.betAmount) {
				throw new BadRequestException('Insufficient balance')
			}
			if (user.username !== dto.username) {
				throw new BadRequestException('Invalid username')
			}

			const spin = await tx.rouletteSpin.create({
				data: {
					userId: dto.userId,
					username: dto.username,
					betAmount: dto.toBetAmountDecimal(),
					isWin: dto.isWin,
					amountOfWin: dto.toAmountOfWinDecimal(),
				},
			})

			const recipientBalance = await this.balanceService.getByUserId(dto.userId)

			if (recipientBalance) {
				await tx.userBalance.update({
					where: { userId: dto.userId },
					data: {
						balance: new Decimal(recipientBalance.balance)
							.minus(dto.betAmount) // Deduct bet
							.plus(dto.amountOfWin), // Add winnings
					},
				})
			}

			return plainToInstance(RouletteSpinDto, {
				id: spin.id,
				userId: spin.userId,
				username: spin.username,
				betAmount: Number(spin.betAmount),
				isWin: spin.isWin,
				amountOfWin: Number(spin.amountOfWin),
				createdAt: spin.createdAt,
				updatedAt: spin.updatedAt
			})
		})
	}
	// return this.prisma.$transaction(async (tx) => {
	// 	const spin = await tx.rouletteSpin.create({
	// 		data: {
	// 			userId: dto.userId,
	// 			username: dto.username,
	// 			betAmount: dto.toBetAmountDecimal(),
	// 			isWin: dto.isWin,
	// 			amountOfWin: dto.toAmountOfWinDecimal(),
	// 		},
	// 	})

	// 	return plainToInstance(RouletteSpinDto, {
	// 		id: spin.id,
	// 		userId: spin.userId,
	// 		username: spin.username,
	// 		betAmount: Number(spin.betAmount),
	// 		isWin: spin.isWin,
	// 		amountOfWin: Number(spin.amountOfWin),
	// 	})
	// })
}
