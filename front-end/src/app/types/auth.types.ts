export interface IAuthForm {
	email: string
	username?: string
	referralCode?: string
	password: string
}

export interface IUser {
	id: number
	username?: string
	email: string
	currency: string
	experience: number
	twoFactorSecret: string
	isTwoFactorVerified: boolean
	referralCode?: string

	createdAt?: Date
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }