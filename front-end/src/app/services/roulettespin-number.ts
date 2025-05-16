
import axios from 'axios'
import { ISpinNumber } from '../types/spinnumber.types'

export interface ISpinNumberResponse {
	spins: ISpinNumber[]

}


class RouletteNumberService {
	private API_URL = 'http://localhost:4200/api/roulette/spins/number'

	async createSpinNumber(number: ISpinNumber) {
		try {
			const response = await axios.post<ISpinNumberResponse>(this.API_URL, number)
			console.log('Number Created:', response.data)
			return response.data
		} catch (error) {
			console.error('Error creating number: ', error)
			throw error
		}
	}

	async getAllSpinNumbers() {
		try {
			const response = await axios.get<ISpinNumberResponse>(`${this.API_URL}/all`)
			console.log('response gettAll: ', response.data)
			return response.data
		} catch (error) {
			console.error('Error in getUsers:', error)
			throw error
		}
	}
}

export default new RouletteNumberService()
