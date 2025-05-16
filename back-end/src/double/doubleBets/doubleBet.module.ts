import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { DoubleBetController } from './doubleBet.controller'
import { DoubleBetService } from './doubleBet.service'

@Module({
	controllers: [DoubleBetController],
	providers: [DoubleBetService, PrismaService],
	exports: [DoubleBetService]
})
export class DoubleBetModule { }
