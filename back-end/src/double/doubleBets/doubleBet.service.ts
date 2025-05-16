import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { DoubleBetDto } from './doubleBet.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class DoubleBetService {
	constructor(private prisma: PrismaService) { }

	async createBet(dto: DoubleBetDto): Promise<DoubleBetDto> {
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
			const doubleBet = await tx.doubleBet.create({
				data: {
					userId: dto.userId,
					gameId: dto.gameId,
					betAmount: dto.toBetAmountDecimal(),
					betValue: dto.betValue,
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

			return plainToInstance(DoubleBetDto, {
				id: doubleBet.id,
				userId: doubleBet.userId,
				betAmount: Number(doubleBet.betAmount),
				betValue: doubleBet.betValue,
			})
		})
	}

	// async getByGameId(gameId: string): Promise<DoubleBetDto> {
	// 	const bets = await this.prisma.doubleSpin.findMany({
	// 		where: { gameId },
	// 	})

	// 	if (!bets) {
	// 		throw new NotFoundException('Bets not found')
	// 	}

	// 	return bets.map(bet => ({
	// 		id: bet.id,
	// 		gameId: bet.gameId,
	// 		userId: bet.userId,
	// 		betAmount: Number(bet.betAmount),
	// 		betValue: bet.betValue,
	// 	}))
	// }
}