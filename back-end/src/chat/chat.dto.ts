import { IsDate, IsString } from 'class-validator'

export class ChatMessageDto {
	@IsString()
	userId: string

	@IsString()
	username: string

	@IsString()
	message: string

	@IsDate()
	createdAt: string
}