import { Injectable } from '@nestjs/common'
import { RouletteNumberDto } from './roulette-num.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class RouletteNumberService {
	constructor(private prisma: PrismaService) { }

	async getById(id: string) {
		return this.prisma.rouletteSpinNumbers.findUnique({
			where: {
				id
			},
		})
	}

	async create(dto: RouletteNumberDto) {
		const roulette_number = {
			number: dto.number
		}

		return this.prisma.rouletteSpinNumbers.create({
			data: roulette_number,
		})
	}

	async findAll(): Promise<RouletteNumberDto[]> {
		const prevSpins = await this.prisma.rouletteSpinNumbers.findMany()

		return prevSpins.map(prevSpin => ({
			number: prevSpin.number
		}))
	}
}