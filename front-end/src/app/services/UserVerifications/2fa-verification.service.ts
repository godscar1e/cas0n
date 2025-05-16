import { axiosWithAuth } from '@/api/interceptors'
import { userService } from '../user.service'

export interface ITwoFAResponse {
	qrCode?: string
	secret?: string
	valid?: boolean
}

class TwoFAService {
	private BASE_URL = 'auth/2fa';

	async generate2FA(email: string) {
		try {
			console.log('Generating 2FA for:', email)
			const response = await axiosWithAuth.post<ITwoFAResponse>(
				`${this.BASE_URL}/generate`,
				{ email }
			)
			console.log(response)
			return response.data
		} catch (error) {
			console.error('Error generating 2FA:', error)
			throw error
		}
	}

	// 2fa-verification.service.ts
	async verify2FA(userId: string, secret: string, token: string) {
		console.log('userId: ', userId)
		if (!userId) {
			console.log('net userId')
			throw new Error('User ID is required')
		}

		try {
			const response = await axiosWithAuth.post<ITwoFAResponse>(
				`${this.BASE_URL}/verify`,
				{ userId, secret, token }
			)
			console.log('Response from server:', response.data)

			if (response.data.valid) {
				console.log('Code is valid, updating user with data:', { userId, secret, token })
				await userService.update(userId, {
					isTwoFactorVerified: true,
					twoFactorSecret: secret // Сохраняем секрет только при успешной верификации
				})
				console.log('User updated successfully for userId:', userId)
			} else {
				console.log('Invalid 2FA code for userId:', userId)
			}

			return response.data
		} catch (error) {
			console.error('Error verifying 2FA:', error)
			throw error
		}
	}

	async verifyRemove2FA(userId: string, token: string) {
		try {
			console.log('Verifying 2FA removal with:', { userId, token })
			const response = await axiosWithAuth.post<ITwoFAResponse>(
				`${this.BASE_URL}/verify-remove`,
				{ userId, token }
			)
			console.log('Verify Remove 2FA response:', response.data)
			return response.data
		} catch (error) {
			console.error('Error verifying 2FA for removal:', error)
			throw error
		}
	}
}

export const twoFAService = new TwoFAService()
