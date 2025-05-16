import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { SessionService } from './sessions.service'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@Controller('sessions')
export class SessionsController {
	constructor(private readonly sessionService: SessionService) { }

	@UseGuards(JwtAuthGuard)
	@Get('user')
	async getUserSessions(@Req() req) {
		const userId = req.user.id
		const userAgent = req.headers['user-agent']
		return this.sessionService.getUserSessions(userId, userAgent)
	}
}
