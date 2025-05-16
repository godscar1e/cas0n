import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CasinoBetsDto } from './casinobets.dto'
import { RouletteSpinsService } from '../../roulette/roulette.service'
import { DoubleSpinsService } from '../../double/double.service'

@Injectable()
export class CasinoBetsService {
	constructor(
		private readonly rouletteService: RouletteSpinsService,
		private readonly doubleService: DoubleSpinsService,
	) { }

	// async findAll(userId?: string): Promise<CasinoBetsDto[]> {
	// 	try {
	// 		const rouletteBets = await this.rouletteService.findAll(userId)
	// 		// const doubleBets = await this.doubleService.findAll(userId)

	// 		console.log('Roulette bets:', rouletteBets)
	// 		// console.log('Double bets:', doubleBets)

	// 		const rouletteDto: CasinoBetsDto[] = rouletteBets.map((bet) => {
	// 			if (!bet.id) {
	// 				console.error('Invalid roulette bet data:', bet)
	// 				throw new Error('Invalid roulette bet data')
	// 			}
	// 			return {
	// 				game: 'Roulette',
	// 				createdAt: " bet.createdAt",
	// 				amount: bet.betAmount,
	// 				multiplier: bet.isWin && bet.betAmount > 0 ? bet.amountOfWin / bet.betAmount : 0,
	// 				betId: bet.id,
	// 			}
	// 		})

	// 		// const doubleDto: CasinoBetsDto[] = doubleBets.map((bet) => {
	// 		// 	if (!bet.id || !bet.createdAt) {
	// 		// 		console.error('Invalid double bet data:', bet)
	// 		// 		throw new Error('Invalid double bet data')
	// 		// 	}
	// 		// 	return {
	// 		// 		game: 'Double',
	// 		// 		createdAt: bet.createdAt,
	// 		// 		amount: bet.betAmount,
	// 		// 		multiplier: bet.isWin && bet.betAmount > 0 ? bet.amountOfWin / bet.betAmount : 0,
	// 		// 		betId: bet.id,
	// 		// 	}
	// 		// })

	// 		return [...rouletteDto].sort(
	// 			(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	// 		)
	// 	} catch (error) {
	// 		console.error('Error in CasinoBetsService.findAll:', error)
	// 		throw new InternalServerErrorException('Failed to fetch casino bets')
	// 	}
	// }
}