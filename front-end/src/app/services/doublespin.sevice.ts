
import axios from 'axios'
import { ISpin } from '../types/spin.types'

export interface IDoubleSpinResponse {
	spins: ISpin[]
}


class DoubleSpinService {
	private API_URL = 'http://localhost:4200/api/double/spins'

	async createSpin(spinData: ISpin) {
		try {
			const response = await axios.post<IDoubleSpinResponse>(this.API_URL, spinData)
			console.log('Spin Created:', response.data)
			return response.data
		} catch (error) {
			console.error('Error creating spin: ', error)
			throw error
		}
	}

}

export default new DoubleSpinService()
