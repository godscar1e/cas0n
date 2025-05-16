import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { DepositsDto } from './deposits.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class DepositsService {
	constructor(private prisma: PrismaService) { }

	async getById(id: string): Promise<DepositsDto> {
		const deposit = await this.prisma.deposits.findUnique({
			where: {
				id,
			},
		})
		if (!deposit) throw new NotFoundException('Deposit not found')
		return plainToInstance(DepositsDto, {
			id: deposit.id,
			userId: deposit.userId,
			amount: Number(deposit.amount),
			status: deposit.status,
		})
	}

	async findAll(): Promise<DepositsDto[]> {
		const deposits = await this.prisma.deposits.findMany()
		return plainToInstance(
			DepositsDto,
			deposits.map((deposit) => ({
				id: deposit.id,
				userId: deposit.userId,
				amount: Number(deposit.amount),
				status: deposit.status,
			})),
		)
	}

	async create(dto: DepositsDto): Promise<DepositsDto> {
		const user = await this.prisma.user.findUnique({
			where: { id: dto.userId },
		})
		if (!user) throw new NotFoundException('User not found')

		const deposit = await this.prisma.deposits.create({
			data: {
				userId: dto.userId,
				amount: dto.toPrismaDecimal(),
				status: dto.status,
			},
		})
		return plainToInstance(DepositsDto, {
			id: deposit.id,
			userId: deposit.userId,
			amount: Number(deposit.amount),
			status: deposit.status,
		})
	}

	async getByUserId(userId: string): Promise<DepositsDto[]> {
		const deposits = await this.prisma.deposits.findMany({
			where: { userId },
		})
		return plainToInstance(
			DepositsDto,
			deposits.map((deposit) => ({
				id: deposit.id,
				userId: deposit.userId,
				amount: Number(deposit.amount),
				status: deposit.status,
			})),
		)
	}
} 