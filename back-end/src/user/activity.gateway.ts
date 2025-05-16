import {
	WebSocketGateway,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
} from '@nestjs/websockets'
import { UserService } from './user.service'

@WebSocketGateway({
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
})
export class ActivityGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private clients = new Map<string, string>(); // Хранение client.id -> userId

	constructor(private userService: UserService) { }

	// Выполняется при подключении клиента
	async handleConnection(client: any) {
		//   console.log('Client connected:', client.id);
	}

	// Событие для установки userId
	@SubscribeMessage('setUser')
	async handleSetUser(client: any, userId: string) {
		//   console.log('handleSetUser called');
		//   console.log('Client ID:', client.id);
		//   console.log('User ID received:', userId);

		if (userId) {
			try {
				this.clients.set(client.id, userId) // Сохраняем userId для клиента
				await this.userService.update(userId, { isActive: true })
				// console.log(`User ${userId} set to active`)
			} catch (error) {
				console.error('Error in handleSetUser:', error)
			}
		}
	}

	// Выполняется при отключении клиента
	async handleDisconnect(client: any) {
		const userId = this.clients.get(client.id) // Получаем userId по client.id
		if (userId) {
			try {
				await this.userService.update(userId, { isActive: false })
				// console.log(`User ${userId} disconnected and set inactive`)
			} catch (error) {
				console.error('Error in handleDisconnect:', error)
			} finally {
				this.clients.delete(client.id) // Удаляем запись о клиенте
			}
		} else {
			// console.warn('UserId not found for client:', client.id)
		}
	}
}
