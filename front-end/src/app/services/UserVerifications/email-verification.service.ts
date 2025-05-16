import { axiosWithAuth } from '@/api/interceptors'

import { IUser, TypeUserForm } from '@/app/types/auth.types'

export interface IProfileResponse {
	user: IUser
}

class VerificationService {
	private BASE_URL = 'user/verify';

	async sendVerificationEmail(email: any) {
		try {
			console.log('Sending email verification to:', email)
			const response = await axiosWithAuth.post<IProfileResponse>(`${this.BASE_URL}/send`, { email })
			console.log(response)
			return response.data
		} catch (error) {
			console.error('Error sending verification email:', error)
			throw error
		}
	}

	async verifyCode(email: any, code: any) {
		try {
			const response = await axiosWithAuth.post<IProfileResponse>(`${this.BASE_URL}/confirm`, { email, code })
			return response.data
		} catch (error) {
			console.error('Error verifying email code:', error)
			throw error
		}
	}
}

export const verificationService = new VerificationService()
