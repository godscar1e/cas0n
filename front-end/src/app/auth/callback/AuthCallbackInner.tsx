'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCallbackInner() {
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const accessToken = searchParams.get('accessToken')
		if (accessToken) {
			localStorage.setItem('accessToken', accessToken)
			router.push('/dashboard')
		} else {
			router.push('/login')
		}
	}, [searchParams, router])

	return <div>Processing login...</div>
}
