import { Module } from '@nestjs/common'
import { RouletteNumberService } from './roulette-num.service'
import { RouletteNumberController } from './roulette-num.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [RouletteNumberController],
	providers: [RouletteNumberService, PrismaService],
	exports: [RouletteNumberService]
})
export class RouletteNumberModule { }
