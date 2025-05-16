import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { TipNRainDto } from './tipnrain.dto'
import { TipNRainService } from './tipnrain.service'

@Controller('tipnrain')
export class TipNRainController {
	constructor(private readonly tipNRainService: TipNRainService) { }

	@Post('/create')
	async create(@Body() dto: TipNRainDto) {
		return this.tipNRainService.create(dto)
	}

	// @Get('')
	// async findAll(): Promise<TipNRainDto[]> {
	// 	return this.tipNRainService.findAll()
	// }

	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.tipNRainService.getById(id)
	}

	@Get('user/:userId')
	async findByUserId(@Param('userId') userId: string) {
		return this.tipNRainService.getByUserId(userId)
	}

}