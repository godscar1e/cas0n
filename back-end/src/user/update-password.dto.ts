
import { IsString, MinLength, MaxLength, Matches } from 'class-validator'

export class UpdatePasswordDto {
	@IsString()
	@MinLength(6, {
		message: 'Old password must be at least 6 characters long',
	})
	@MaxLength(100, {
		message: 'Old password must not exceed 100 characters',
	})
	oldPassword: string

	@IsString()
	@MinLength(8, {
		message: 'New password must be at least 8 characters long',
	})
	@MaxLength(100, {
		message: 'New password must not exceed 100 characters',
	})
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
		message: 'New password must contain at least one uppercase letter, one lowercase letter, and one number',
	})
	newPassword: string
}