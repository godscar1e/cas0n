import axios from 'axios'
import { ITip } from '../../types/transactions/tip.types'

export interface ITipResponse {
	tips: ITip[]
}

class TipService {
	private API_URL = 'http://localhost:4200/api/tipnrain'

	async createTip(tipData: ITip) {
		try {
			const response = await axios.post<ITipResponse>(`${this.API_URL}/create`, tipData)
			console.log('Tip Created:', response.data)
			return response.data
		} catch (error) {
			console.error('Error creating tip: ', error)
			throw error
		}
	}
}

export default new TipService()