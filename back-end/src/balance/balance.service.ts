import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BalanceDto } from './balance.dto'
import { Decimal } from '@prisma/client/runtime/library'

@Injectable()
export class BalanceService {
  constructor(private prisma: PrismaService) { }

  async getByUserId(userId: string) {
    return this.prisma.userBalance.findUnique({
      where: {
        userId,
      },
    })
  }

  async getBalance(userId: string) {
    const balanceRecord = await this.getByUserId(userId)
    if (!balanceRecord) {
      return { balance: '0' } // Возвращаем строку '0' вместо null
    }
    return {
      balance: balanceRecord.balance, // Convert Decimal to string for response
    }
  }

  async create(dto: BalanceDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    })

    if (!user) {
      throw new Error(`User with id ${dto.userId} does not exist`)
    }

    return this.prisma.userBalance.create({
      data: {
        userId: dto.userId,
        balance: dto.toBetAmountDecimal(), // Convert number to Decimal
      },
    })
  }

  async update(id: string, updateData: Partial<BalanceDto>) {
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('User ID is required for update')
    }

    const data: any = { ...updateData }
    if (updateData.balance !== undefined) {
      data.balance = new Decimal(updateData.balance) // Convert number to Decimal
    }

    return this.prisma.userBalance.update({
      where: { userId: id },
      data,
    })
  }
}