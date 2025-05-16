import { axiosWithAuth } from '@/api/interceptors'
import { IUser, TypeUserForm } from '@/app/types/auth.types'

export interface IProfileResponse {
	users: IUser[]
	user: IUser
}

class UserService {
	private BASE_URL = '/user/profile'

	async getProfile() {
		try {
			const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)
			return response.data
		} catch (error) {
			// console.error('Error in getProfile:', error) 
			throw error
		}
	}

	async getIdByUsername(username: string) {
		try {
			const response = await axiosWithAuth.get<IProfileResponse>(
				`${this.BASE_URL}?username=${username}`
			)
			return response.data
		} catch (error) {
			throw error
		}
	}


	async getAll() {
		try {
			const response = await axiosWithAuth.get<IProfileResponse>('http://localhost:4200/api/user/profile/all')
			console.log('response gettAll: ', response.data)
			return response.data
		} catch (error) {
			console.error('Error in getUsers:', error)
			throw error
		}
	}

	async update(id: string, updateData: Partial<IUser>) {
		try {
			//здесь проблема с путем
			const response = await axiosWithAuth.patch<IUser>(this.BASE_URL, updateData)
			return response.data
		} catch (error) {
			console.error('Error updating user:', error)
			throw error
		}
	}

	async updatePassword(id: string, passwordData: { oldPassword: string; newPassword: string }) {
		try {
			const response = await axiosWithAuth.patch<IUser>(`${this.BASE_URL}/${id}/password`, passwordData)
			return response.data
		} catch (error) {
			console.error('Error updating password:', error)
			throw error
		}
	}


}

export const userService = new UserService()
