import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UAParser } from 'ua-parser-js'
import { Session } from './session.entity'


@Injectable()
export class SessionService {
	constructor(@InjectRepository(Session) private sessionRepo: Repository<Session>) { }

	async getUserSessions(userId: string, userAgent: string) {
		return this.sessionRepo.find({
			where: { userId },
			order: { createdAt: 'DESC' },
		})
	}

	async createSession(userId: string, ipAddress: string, userAgent: string) {
		const parser = new UAParser(userAgent) // Теперь вызываем напрямую с передачей userAgent
		const deviceInfo = parser.getResult() // Получаем результаты
		const device = `${deviceInfo.os.name} ${deviceInfo.os.version} | ${deviceInfo.browser.name} ${deviceInfo.browser.version}`

		const session = this.sessionRepo.create({
			userId,
			ipAddress,
			device,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
		})

		return this.sessionRepo.save(session)
	}
}
