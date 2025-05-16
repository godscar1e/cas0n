import { Module } from '@nestjs/common'
import { RouletteSpinsService } from './roulette.service'
import { RouletteSpinsController } from './roulette.controller'
import { PrismaService } from 'src/prisma.service'
import { BalanceModule } from 'src/balance/balance.module'

@Module({
  imports: [BalanceModule],
  controllers: [RouletteSpinsController],
  providers: [RouletteSpinsService, PrismaService],
  exports: [RouletteSpinsService]
})
export class RouletteSpinsModule { }
