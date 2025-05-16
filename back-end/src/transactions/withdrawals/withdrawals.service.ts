import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { WithdrawalsDto } from './withdrawals.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class WithdrawalsService {
	constructor(private prisma: PrismaService) { }

	async getById(id: string): Promise<WithdrawalsDto> {
		const withdrawal = await this.prisma.withdrawals.findUnique({
			where: { id },
		})

		if (!withdrawal) {
			throw new NotFoundException('Withdrawal not found')
		}

		return plainToInstance(WithdrawalsDto, {
			id: withdrawal.id,
			userId: withdrawal.userId,
			transactionId: withdrawal.transactionId,
			amount: Number(withdrawal.amount),
			status: withdrawal.status,
		})
	}

	async findAll(): Promise<WithdrawalsDto[]> {
		const withdrawals = await this.prisma.withdrawals.findMany()

		return plainToInstance(
			WithdrawalsDto,
			withdrawals.map((withdrawal) => ({
				id: withdrawal.id,
				userId: withdrawal.userId,
				transactionId: withdrawal.transactionId,
				amount: Number(withdrawal.amount),
				status: withdrawal.status,
			}))
		)
	}

	async create(dto: WithdrawalsDto) {
		const user = await this.prisma.user.findUnique({
			where: { id: dto.userId },
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return this.prisma.withdrawals.create({
			data: {
				userId: dto.userId,
				transactionId: dto.transactionId,
				amount: dto.toPrismaDecimal(),
				status: dto.status,
			},
		})
	}

	async getByUserId(userId: string): Promise<WithdrawalsDto[]> {
		const withdrawals = await this.prisma.withdrawals.findMany({
			where: { userId },
		})

		return plainToInstance(
			WithdrawalsDto,
			withdrawals.map((withdrawal) => ({
				id: withdrawal.id,
				userId: withdrawal.userId,
				transactionId: withdrawal.transactionId,
				amount: Number(withdrawal.amount),
				status: withdrawal.status,
			}))
		)
	}
}
