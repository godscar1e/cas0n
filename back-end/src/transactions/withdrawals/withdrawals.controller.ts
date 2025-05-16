import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { WithdrawalsDto } from './withdrawals.dto'
import { WithdrawalsService } from './withdrawals.service'

@Controller('withdrawal')
export class WithdrawalsController {
	constructor(private readonly withdrawalsService: WithdrawalsService) { }

	@Post('')
	async deposit(@Body() dto: WithdrawalsDto) {
		return this.withdrawalsService.create(dto)
	}

	@Get('')
	async findAll(): Promise<WithdrawalsDto[]> {
		return this.withdrawalsService.findAll()
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.withdrawalsService.getById(id)
	}

	@Get('user/:userId')
	async findByUserId(@Param('userId') userId: string) {
		return this.withdrawalsService.getByUserId(userId)
	}

}