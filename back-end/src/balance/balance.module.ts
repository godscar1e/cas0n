import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BalanceController } from './balance.controller'
import { BalanceService } from './balance.service'

@Module({
  controllers: [BalanceController],
  providers: [BalanceService, PrismaService],
  exports: [BalanceService]
})
export class BalanceModule { }
