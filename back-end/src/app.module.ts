import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { RouletteSpinsModule } from './roulette/roulette.module'
import { ChatModule } from './chat/chat.module'
import { RouletteNumberModule } from './rouletteNumbers/roulette.model'
import { DoubleSpinsModule } from './double/double.module'
import { UserInfoModule } from './basicUserInfo/userinfo.module'
import { DepositsModule } from './transactions/deposits/deposits.module'
import { TableModule } from './transactions/table.module'
import { WithdrawalsModule } from './transactions/withdrawals/withdrawals.module'
import { TipNRainModule } from './transactions/tipNRain/tipnrain.module'
import { NotificationModule } from './notifications/notification.module'
import { BalanceModule } from './balance/balance.module'
import { DoubleBetModule } from './double/doubleBets/doubleBet.module'

@Module({
  imports: [
    ConfigModule.forRoot(), AuthModule, UserModule, BalanceModule, NotificationModule, UserInfoModule, DepositsModule, WithdrawalsModule, TipNRainModule, TableModule, RouletteSpinsModule, RouletteNumberModule, ChatModule, DoubleSpinsModule, DoubleBetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
