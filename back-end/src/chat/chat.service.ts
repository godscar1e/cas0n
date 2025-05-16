import { Injectable } from '@nestjs/common'
import { ChatMessageDto } from './chat.dto'
import { PrismaService } from 'src/prisma.service'


@Injectable()
export class ChatMessageService {
	constructor(private prisma: PrismaService) { }

	async getById(id: string) {
		return this.prisma.chatMessage.findUnique({
			where: {
				id
			},
		})
	}

	async create(dto: ChatMessageDto) {
		const chat_message = {
			userId: dto.userId,
			username: dto.username,
			message: dto.message,
			createdAt: dto.createdAt
		}

		return this.prisma.chatMessage.create({
			data: chat_message,
		})
	}

	async getAllMessages() {
		return this.prisma.chatMessage.findMany({
			orderBy: { createdAt: 'asc' },
		})
	}

}