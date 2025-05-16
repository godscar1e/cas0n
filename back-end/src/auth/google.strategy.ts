// auth/google.strategy.ts
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { UserService } from 'src/user/user.service'
import { UserDto } from 'src/user/user.dto'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(
		private configService: ConfigService,
		private userService: UserService,
	) {
		super({
			clientID: configService.get('GOOGLE_CLIENT_ID'),
			clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
			callbackURL: 'http://localhost:4200/api/auth/google/callback',
			scope: ['email', 'profile'],
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback,
	): Promise<any> {
		const { emails, displayName } = profile
		const email = emails[0].value

		let user = await this.userService.getByEmail(email)

		if (!user) {
			const newUser: UserDto = {
				email,
				name: displayName || email.split('@')[0],
				password: '', // Пустой пароль для Google
				referralCode: Math.random().toString(36).substring(2, 8),
				experience: 0,
				currency: 'USD',
				role: 'user',
				isActive: true,
				isEmailVerified: true,
				isBasicVerified: false,
				twoFactorSecret: null,
				isTwoFactorVerified: false,
				verificationCode: null,
			}
			user = await this.userService.create(newUser)
		}

		done(null, user)
	}
}