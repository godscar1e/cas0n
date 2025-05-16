import { IsEnum, IsString, IsOptional, MinLength, IsDate } from 'class-validator'

export enum NotificationType {
	DEPOSIT = 'deposit',
	WITHDRAWAL = 'withdrawal',
	LOGIN = 'login',
	SYSTEM = 'system',
	PROMOTION = 'promotion',
}

export class NotificationDto {
	@IsEnum(NotificationType)
	type: NotificationType

	@IsString()
	@MinLength(1)
	message: string

	@IsString()
	@IsOptional()
	userId?: string

	@IsString()
	@IsOptional()
	metadata?: string

}