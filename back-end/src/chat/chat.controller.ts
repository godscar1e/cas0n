import { Body, Controller, Get, Post } from '@nestjs/common'
import { ChatMessageService } from './chat.service'
import { ChatMessageDto } from './chat.dto'

@Controller('chat/message')
export class ChatMessageController {
	constructor(private readonly chatMessageService: ChatMessageService) { }

	@Post()
	async createMessage(@Body() dto: ChatMessageDto): Promise<ChatMessageDto> {
		try {
			const createdMessage = await this.chatMessageService.create(dto)
			return {
				...createdMessage,
				createdAt: createdMessage.createdAt.toISOString(),
				// updatedAt: createdMessage.updatedAt.toISOString(),
			}
		} catch (error) {
			console.error('Error creating message: ', error)
			throw error
		}
	}

	@Get()
	async getAllMessages(): Promise<ChatMessageDto[]> {
		try {
			const messages = await this.chatMessageService.getAllMessages()
			return messages.map((message) => ({
				...message,
				createdAt: message.createdAt.toISOString(),
				updatedAt: message.updatedAt.toISOString(),
			}))
		} catch (error) {
			console.error('Error fetching messages: ', error)
			throw error
		}
	}
}
