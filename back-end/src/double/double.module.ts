import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { DoubleSpinsController } from './double.controller'
import { DoubleSpinsService } from './double.service'

@Module({
  controllers: [DoubleSpinsController],
  providers: [DoubleSpinsService, PrismaService],
  exports: [DoubleSpinsService]
})
export class DoubleSpinsModule { }
