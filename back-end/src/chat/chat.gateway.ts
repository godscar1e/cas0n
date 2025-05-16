import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

import { ChatMessageService } from './chat.service'



@WebSocketGateway({
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

	constructor(private chatMessageService: ChatMessageService) { }

	@WebSocketServer() server: Server

	handleConnection(client: Socket) {
		// console.log(`Client connected: ${client.id}`)
	}

	handleDisconnect(client: Socket) {
		// console.log(`Client disconnected: ${client.id}`)
	}

	@SubscribeMessage('loadMessages')
	async handleLoadMessages(client: Socket) {
		try {
			const messages = await this.chatMessageService.getAllMessages()
			client.emit('loadMessages', messages) // Отправляем сообщения только подключившемуся клиенту
		} catch (error) {
			console.error('Error loading messages:', error)
		}
	}


	@SubscribeMessage('sendMessage')
	async handleMessage(client: Socket, message: { sender: string, username: string, textmessage: string, createdAt: string }) {
		try {
			console.log(`Received message from ${client.id}:`, message)
			const createdAt = message.createdAt || new Date().toISOString()
			// Сохраняем сообщение в базу данных
			const savedMessage = await this.chatMessageService.create({
				userId: message.sender,
				username: message.username,
				message: message.textmessage,
				createdAt
			})

			// Эмитим сохраненное сообщение всем клиентам
			this.server.emit('receiveMessage', {
				id: savedMessage.id,
				username: savedMessage.username,
				sender: message.sender,
				textmessage: message.textmessage,
				createdAt: createdAt,
			})

		} catch (error) {
			console.error('Error in handleMessage:', error)
		}
	}


}
