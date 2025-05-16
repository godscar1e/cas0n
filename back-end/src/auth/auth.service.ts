import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'
import * as speakeasy from 'speakeasy'
import * as qrcode from 'qrcode'
import { Response } from 'express'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(
		private jwt: JwtService,
		private userService: UserService
	) { }

	// auth/auth.service.ts
	async login(dto: AuthDto) {
		console.log('Login DTO:', dto)
		const { password, ...user } = await this.validateUser(dto)
		const tokens = this.issueTokens(user.id)
		return { user, ...tokens }
	}

	// auth/auth.service.ts
	async register(dto: RegisterDto) {
		console.log('Register DTO:', dto)
		const oldUser = await this.userService.getByEmail(dto.email)
		if (oldUser) throw new BadRequestException('User already exists')

		const userData = {
			email: dto.email,
			username: dto.username,
			password: dto.password,
			referralCode: dto.referralCode,
			currency: 'USD',
			role: 'user',
			isActive: true,
			isEmailVerified: false,
			isBasicVerified: false,
			twoFactorSecret: null,
			isTwoFactorVerified: false,
		}

		const { password, ...user } = await this.userService.create(userData)
		const tokens = this.issueTokens(user.id)
		return { user, ...tokens }
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid refresh token')

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.userService.getById(result.id)

		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	private issueTokens(userId: string) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	public generateTokens(userId: string) {
		return this.issueTokens(userId)
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)

		if (!user) throw new NotFoundException('User not found')

		const isValid = await verify(user.password, dto.password)

		if (!isValid) throw new UnauthorizedException('Invalid password')

		return user
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: 'localhost',
			expires: expiresIn,
			secure: true,
			// lax if production
			sameSite: 'none'
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: 'localhost',
			expires: new Date(0),
			secure: true,
			// lax if production
			sameSite: 'none'
		})
	}

	generate2FASecret(userEmail: string) {
		const secret = speakeasy.generateSecret({
			length: 20,
			name: `Winstar.com (${userEmail})`,
		})

		return {
			secret: secret.base32, // Храним в базе у пользователя
			otpauthUrl: secret.otpauth_url, // Используется для генерации QR-кода
		}
	}

	async generateQRCode(otpauthUrl: string): Promise<string> {
		return await qrcode.toDataURL(otpauthUrl)
	}

	async verify2FA(userId: string, secret: string, token: string) {
		console.log('Verifying 2FA for userId:', userId, 'with secret:', secret, 'and token:', token)

		const isValid = speakeasy.totp.verify({
			secret,
			encoding: 'base32',
			token,
			window: 1,
		})

		console.log('2FA verification result:', isValid)

		if (isValid) {
			try {
				console.log('Saving 2FA secret for userId:', userId)
				await this.userService.update(userId, {
					twoFactorSecret: secret, // Сохраняем секрет
					isTwoFactorVerified: true // Обновляем статус верификации
				})
				console.log('2FA secret saved successfully for userId:', userId)
			} catch (error) {
				console.error('Error saving 2FA secret:', error)
				throw new BadRequestException('Failed to save 2FA secret')
			}
		}

		return { valid: isValid }
	}

	async verifyRemove2FA(userId: string, token: string) {
		console.log('Verifying 2FA removal for userId:', userId, 'with token:', token)

		try {
			const user = await this.userService.getById(userId)
			console.log('User retrieved:', user)

			if (!user) {
				console.log('User not found for userId:', userId)
				throw new NotFoundException('User not found')
			}

			if (!user.twoFactorSecret) {
				console.log('No 2FA secret found for user:', userId)
				throw new BadRequestException('2FA not enabled for this user')
			}

			console.log('Verifying token with secret:', user.twoFactorSecret)
			const isValid = speakeasy.totp.verify({
				secret: user.twoFactorSecret,
				encoding: 'base32',
				token,
				window: 1,
			})
			console.log('Token verification result:', isValid)

			if (isValid) {
				console.log('Updating user to remove 2FA')
				await this.userService.update(userId, {
					twoFactorSecret: null,
					isTwoFactorVerified: false
				})
				console.log('2FA removed successfully for user:', userId)
				return { valid: true, message: '2FA removed successfully' }
			}

			console.log('Invalid 2FA code for user:', userId)
			return { valid: false, message: 'Invalid 2FA code' }
		} catch (error) {
			console.error('Error in verifyRemove2FA:', error)
			throw error // Let NestJS handle the error and return a proper response
		}
	}

}
