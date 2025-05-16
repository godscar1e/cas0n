import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { DoubleSpinDto } from './double.dto'
import { DoubleSpinsService } from './double.service'


@Controller('double/spins')
export class DoubleSpinsController {
	constructor(private readonly doubleSpinsService: DoubleSpinsService) { }

	@Post()
	@HttpCode(201)
	async create(@Body() dto: DoubleSpinDto): Promise<DoubleSpinDto> {
		return this.doubleSpinsService.create(dto)
	}
}
