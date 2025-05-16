import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { WithdrawalsController } from './withdrawals.controller'
import { WithdrawalsService } from './withdrawals.service'


@Module({
	controllers: [WithdrawalsController],
	providers: [WithdrawalsService, PrismaService],
	exports: [WithdrawalsService]
})
export class WithdrawalsModule { }