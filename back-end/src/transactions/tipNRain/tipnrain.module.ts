import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TipNRainController } from './tipnrain.controller'
import { TipNRainService } from './tipnrain.service'
import { BalanceModule } from 'src/balance/balance.module'


@Module({
	imports: [BalanceModule],
	controllers: [TipNRainController],
	providers: [TipNRainService, PrismaService],
	exports: [TipNRainService]
})
export class TipNRainModule { }