import { RouletteNumberService } from './roulette-num.service'
import { RouletteNumberDto } from './roulette-num.dto'
import { Body, Controller, Get, Post } from '@nestjs/common'


@Controller('roulette/spins/number')
export class RouletteNumberController {
	constructor(private readonly rouletteNumberService: RouletteNumberService) { }

	@Post()
	async createSpinNumber(@Body() dto: RouletteNumberDto): Promise<RouletteNumberDto> {
		try {

			const createdSpinNum = await this.rouletteNumberService.create(dto)
			return createdSpinNum
		} catch (error) {
			console.error('Error creating spin number: ', error)
			throw error
		}
	}

	@Get('/all')
	async getAllSpins(): Promise<RouletteNumberDto[]> {
		try {
			const spins = await this.rouletteNumberService.findAll()
			return spins
		} catch (error) {
			console.error('Error fetching spins: ', error)
			throw error
		}
	}

}
