import { axiosWithAuth } from '@/api/interceptors'

interface IBalanceResponse {
	balance: string | null
}

class BalanceService {
	private BASE_URL = '/user/balance';

	async getBalance() {
		try {
			const response = await axiosWithAuth.get<IBalanceResponse>(this.BASE_URL)
			// console.log('Response:', response)
			return response.data
		} catch (error) {
			console.error('Error in getBalance:', error)
			throw error
		}
	}
}

export const balanceService = new BalanceService()