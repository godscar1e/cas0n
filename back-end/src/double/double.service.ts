import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { DoubleSpinDto } from './double.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class DoubleSpinsService {
	constructor(private prisma: PrismaService) { }

	async getById(id: string): Promise<DoubleSpinDto> {
		const spin = await this.prisma.doubleSpin.findUnique({
			where: { id },
		})

		if (!spin) {
			throw new NotFoundException('Double spin not found')
		}

		return plainToInstance(DoubleSpinDto, {
			id: spin.id,
			userId: spin.userId,
			betAmount: Number(spin.betAmount),
			betValue: spin.betValue,
			amountOfWin: Number(spin.amountOfWin),
		})
	}

	// async getByGameId(gameId: string): Promise<DoubleSpinDto> {
	// 	const bets = await this.prisma.doubleSpin.findMany({
	// 		where: { gameId },
	// 	})

	// 	if (!bets) {
	// 		throw new NotFoundException('Bets not found')
	// 	}

	// 	return bets.map(bet => ({
	// 		// id: spin.id,
	// 		userId: bet.userId,
	// 		betAmount: Number(bet.betAmount),
	// 		betValue: spin.betValue,
	// 	}))
	// }

	async create(dto: DoubleSpinDto): Promise<DoubleSpinDto> {
		const user = await this.prisma.user.findUnique({
			where: { id: dto.userId },
			include: { userBalance: true },
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		if (!user.userBalance || Number(user.userBalance.balance) < dto.betAmount) {
			throw new BadRequestException('Insufficient balance')
		}

		return this.prisma.$transaction(async (tx) => {
			const doubleSpin = await tx.doubleSpin.create({
				data: {
					userId: dto.userId,
					gameId: dto.gameId,
					betAmount: dto.toBetAmountDecimal(),
					betValue: dto.betValue,
					amountOfWin: dto.toAmountOfWinDecimal(),
				},
			})

			await tx.userBalance.update({
				where: { userId: dto.userId },
				data: {
					balance: {
						decrement: dto.betAmount,
					},
				},
			})

			return plainToInstance(DoubleSpinDto, {
				id: doubleSpin.id,
				userId: doubleSpin.userId,
				betAmount: Number(doubleSpin.betAmount),
				betValue: doubleSpin.betValue,
				amountOfWin: Number(doubleSpin.amountOfWin),
			})
		})
	}
}