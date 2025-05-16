import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController, UserVerificationController } from './user.controller'
import { PrismaService } from 'src/prisma.service'
import { ActivityGateway } from './activity.gateway'
import { BalanceService } from 'src/balance/balance.service'

@Module({
  controllers: [UserController, UserVerificationController],
  providers: [UserService, BalanceService, PrismaService, ActivityGateway],
  exports: [UserService]
})
export class UserModule { }
