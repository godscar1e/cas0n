import axios from 'axios'
import { INotification } from '../types/notification.types'

export interface INotificationResponse {
	notifications: INotification[]
}

class NotificationService {
	private BASE_URL = 'http://localhost:4200/api'
	private API_URL = '/user/notification'

	async getNotifications(userId: string) {
		try {
			const url = `${this.BASE_URL}${this.API_URL}/${userId}` // Use path parameter
			const response = await axios.get<INotificationResponse>(url)
			console.log('API Response:', response.data)
			return response.data
		} catch (error) {
			console.error('Error in getNotifications:', error)
			throw error
		}
	}
}

export default new NotificationService()