import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common'
import { RouletteSpinsService } from './roulette.service'
import { RouletteSpinDto } from './roulette.dto'

@Controller('roulette/spins') export class RouletteSpinsController {
	constructor(private readonly rouletteSpinsService: RouletteSpinsService) { }

	@Post()
	async create(@Body(new ValidationPipe()) dto: RouletteSpinDto): Promise<RouletteSpinDto> {
		try {
			console.log('Received DTO:', JSON.stringify(dto, null, 2))
			const createdSpin = await this.rouletteSpinsService.create(dto)
			return createdSpin
		} catch (error) {
			console.error('Error creating spin:', {
				name: error.name,
				message: error.message,
				stack: error.stack,
				dto,
			})
			console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))

			// Пример для HttpException
			if (error.getResponse && error.getStatus) {
				console.error('HttpException response:', error.getResponse())
			}

			throw error
		}
	}

	@Get()
	async findAll(): Promise<RouletteSpinDto[]> {
		try {
			const spins = await this.rouletteSpinsService.findAll()
			return spins
		} catch (error) {
			console.error('Error fetching spins:', error)
			throw error
		}
	}

}