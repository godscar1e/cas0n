'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCallback() {
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const accessToken = searchParams.get('accessToken')
		if (accessToken) {
			// Сохраните токен в localStorage или контексте
			localStorage.setItem('accessToken', accessToken)
			router.push('/dashboard') // Перенаправьте на защищённую страницу
		} else {
			router.push('/login') // Если токена нет, вернитесь на страницу входа
		}
	}, [searchParams, router])

	return <div>Processing login...</div>
}