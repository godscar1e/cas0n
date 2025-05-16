import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { ChatMessageController } from './chat.controller'
import { PrismaService } from 'src/prisma.service'
import { ChatMessageService } from './chat.service'

@Module({
	controllers: [ChatMessageController],
	providers: [ChatMessageService, PrismaService, ChatGateway],
	exports: [ChatMessageService]
})
export class ChatModule { }
