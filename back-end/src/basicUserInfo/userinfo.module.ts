import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserInfoController } from './userinfo.controller'
import { UserInfoService } from './userinfo.service'
import { UserModule } from 'src/user/user.module'

@Module({
  controllers: [UserInfoController],
  imports: [UserModule],
  providers: [UserInfoService, PrismaService],
  exports: [UserInfoService]
})
export class UserInfoModule { }