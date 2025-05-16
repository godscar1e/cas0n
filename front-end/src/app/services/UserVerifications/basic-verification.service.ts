// src/services/BasicVerificationService.ts
import { axiosWithAuth } from '@/api/interceptors'
import { AxiosError } from 'axios'

interface BasicVerificationData {
	country: string
	firstName: string
	lastName: string
	dateOfBirth: {
		day: number
		month: string
		year: number
	}
}

interface VerificationResponse {
	message: string
	data: any
}

interface ErrorResponse {
	message: string
	status?: number
}

class BasicVerificationService {
	private BASE_URL = 'user/info';

	async submitBasicVerification(data: BasicVerificationData): Promise<VerificationResponse> {
		try {
			const payload = {
				country: data.country,
				firstName: data.firstName,
				lastName: data.lastName,
				dateOfBirth: `${data.dateOfBirth.year}-${this.formatMonth(data.dateOfBirth.month)}-${this.padDay(data.dateOfBirth.day)}`,
			}
			console.log('Request payload:', payload) // Логируем данные, отправляемые на сервер
			const response = await axiosWithAuth.post<VerificationResponse>(
				`${this.BASE_URL}/basic-verification`,
				payload
			)
			return response.data
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>
			console.error('Error submitting basic verification:', axiosError)
			if (axiosError.response?.data) {
				throw new Error(axiosError.response.data.message || 'Failed to submit basic verification')
			}
			throw new Error('Failed to submit basic verification')
		}
	}

	private formatMonth(month: string): string {
		const monthMap: { [key: string]: string } = {
			January: '01',
			February: '02',
			March: '03',
			April: '04',
			May: '05',
			June: '06',
			July: '07',
			August: '08',
			September: '09',
			October: '10',
			November: '11',
			December: '12',
		}
		return monthMap[month] || month
	}

	private padDay(day: number): string {
		return day < 10 ? `0${day}` : day.toString()
	}
}

export const basicVerificationService = new BasicVerificationService()