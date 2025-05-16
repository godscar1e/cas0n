'use client'

import { Suspense } from 'react'
import AuthCallbackInner from './AuthCallbackInner'

export default function AuthCallback() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AuthCallbackInner />
		</Suspense>
	)
}
