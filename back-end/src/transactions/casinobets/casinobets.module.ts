import { Module } from '@nestjs/common'
import { CasinoBetsService } from './casinobets.service'
import { CasinoBetsController } from './casinobets.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [CasinoBetsController],
	providers: [CasinoBetsService, PrismaService],
	exports: [CasinoBetsService]
})
export class CasinoBetsModule { }