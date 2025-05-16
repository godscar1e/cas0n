import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TableController } from './table.controller'
import { DepositsService } from './deposits/deposits.service'
import { WithdrawalsService } from './withdrawals/withdrawals.service'
import { TipNRainModule } from './tipNRain/tipnrain.module'
import { CasinoBetsService } from './casinobets/casinobets.service'
import { RouletteSpinsModule } from '../roulette/roulette.module' // Import RouletteModule
import { DoubleSpinsModule } from '../double/double.module' // Import DoubleModule
import { CasinoBetsModule } from './casinobets/casinobets.module'

@Module({
	imports: [TipNRainModule, RouletteSpinsModule, DoubleSpinsModule], // Add RouletteModule and DoubleModule
	controllers: [TableController],
	providers: [PrismaService, DepositsService, WithdrawalsService, CasinoBetsService],
})
export class TableModule { }