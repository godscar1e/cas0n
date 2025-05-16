import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { DoubleBetDto } from './doubleBet.dto'
import { DoubleBetService } from './doubleBet.service'


@Controller('double/bet')
export class DoubleBetController {
	constructor(private readonly doubleBetService: DoubleBetService) { }

	@Post()
	@HttpCode(201)
	async createBet(@Body() dto: DoubleBetDto): Promise<DoubleBetDto> {
		return this.doubleBetService.createBet(dto)
	}
}
