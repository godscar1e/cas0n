import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Session } from './session.entity'
import { SessionService } from './sessions.service'

@Module({
	imports: [TypeOrmModule.forFeature([Session])], // Импортируем сущность Session
	providers: [SessionService], // Регистрируем сервис
	exports: [SessionService], // Экспортируем сервис, чтобы использовать его в других модулях
})
export class SessionModule { }
