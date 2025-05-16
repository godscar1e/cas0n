'use client'

import { FC } from 'react'
import { FcGoogle } from 'react-icons/fc'

export const SocialLoginButtons: FC = () => {
	const handleGoogleLogin = () => {
		window.location.href = 'http://localhost:4200/api/auth/google'
	}

	return (
		<div className="w-full mt-5">
			<p className="flex justify-center text-base font-normal">Or continue with</p>
			<div className="flex gap-5 mt-5">
				<button
					onClick={handleGoogleLogin}
					className="flex justify-center w-[195px] h-[54px] items-center gap-[10px] border rounded-[5px] text-xl font-medium"
				>
					<FcGoogle /> Google
				</button>
			</div>
		</div>
	)
}