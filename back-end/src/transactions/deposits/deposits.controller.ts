import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common'
import { DepositsService } from './deposits.service'
import { DepositsDto } from './deposits.dto'

@Controller('deposit')
export class DepositsController {
	constructor(private readonly depositsService: DepositsService) { }

	@Post('')
	async deposit(@Body() dto: DepositsDto) {
		return this.depositsService.create(dto)
	}

	// Получение всех депозитов
	@Get('')
	async findAll(): Promise<DepositsDto[]> {
		return this.depositsService.findAll()
	}

	// Получение депозита по ID
	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.depositsService.getById(id)
	}

	@Get('user/:userId')
    async findByUserId(@Param('userId') userId: string) {
        return this.depositsService.getByUserId(userId)
    }
	
}