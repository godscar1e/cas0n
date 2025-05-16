import { Controller, Get, Query } from '@nestjs/common'
import { CasinoBetsService } from './casinobets.service'
import { CasinoBetsDto } from './casinobets.dto'

@Controller('casinobets')
export class CasinoBetsController {
	constructor(private readonly casinobetsService: CasinoBetsService) { }

	// @Get()
	// async findAll(@Query('userId') userId: string): Promise<CasinoBetsDto[]> {
	// 	return this.casinobetsService.findAll(userId)
	// }
}