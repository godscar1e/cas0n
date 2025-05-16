import { Controller, Get, Query, BadRequestException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { DepositsService } from './deposits/deposits.service'
import { WithdrawalsService } from './withdrawals/withdrawals.service'
import { TipNRainService } from './tipNRain/tipnrain.service'
import { CasinoBetsService } from './casinobets/casinobets.service'

@Controller('table')
export class TableController {
	constructor(
		private prisma: PrismaService,
		private depositsService: DepositsService,
		private withdrawalsService: WithdrawalsService,
		private tipNRainService: TipNRainService,
		private casinoBetsService: CasinoBetsService,
	) { }

	@Get('')
	async getTableData(
		@Query('table') table: string,
		@Query('userId') userId?: string,
	) {
		switch (table) {
			case 'deposits':
				if (userId) {
					return this.depositsService.getByUserId(userId)
				}
				return await this.prisma.deposits.findMany()
			case 'withdrawals':
				if (userId) {
					return this.withdrawalsService.getByUserId(userId)
				}
				return await this.prisma.withdrawals.findMany()
			case 'tipnrain':
				if (userId) {
					return this.tipNRainService.getByUserId(userId)
				}
				return await this.prisma.tipnRain.findMany()
			// case 'casinobets':
			// 	if (userId) {
			// 		return this.casinoBetsService.findAll(userId)
			// 	}
			// 	return this.casinoBetsService.findAll(userId)
			default:
				console.log(userId)
				throw new Error('Invalid table name')
				throw new BadRequestException('Invalid table name')
		}
	}
}