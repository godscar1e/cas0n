'use client'

import { useState } from 'react'
import { verificationService } from '../../../services/UserVerifications/email-verification.service'
import SuccessWindow from '../SuccessWindow'
import { Toaster, toast } from 'sonner'

export const VerificationItem = ({ title, description, isVerified, showInput, onVerify }) => {
	const [email, setEmail] = useState('')
	const [code, setCode] = useState('')
	const [emailSent, setEmailSent] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [showSuccess, setShowSuccess] = useState(false)

	const handleSendEmail = async () => {
		setLoading(true)
		setError(null)
		try {
			await verificationService.sendVerificationEmail(email)
			setEmailSent(true)
		} catch (error) {
			setError('Failed to send email verification. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const handleVerifyCode = async () => {
		setLoading(true)
		setError(null)
		try {
			const isValid = await verificationService.verifyCode(email, code)
			if (isValid) {
				setShowSuccess(true)
				onVerify(true)
				toast.success('Your Email verification is completed!')
			} else {
				setError('Invalid verification code.')
			}
		} catch (error) {
			setError('Failed to verify code. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const handleCloseSuccess = () => {
		setShowSuccess(false)
		setEmail('')
		setCode('')
		setEmailSent(false)
	}

	return (
		<div className="mt-5 px-10 py-5 border border-placeholder rounded-[5px]">
			<div className="flex justify-between gap-5">
				<div className="">
					<div className="flex items-center gap-5">
						<h5 className="text-xlresp font-medium leading-6 text-nowrap">{title}</h5>
						<div
							className={`max-w-[101px] w-full h-6 px-2 border border-placeholder rounded-md flex items-center justify-center font-extralight ${isVerified ? 'text-emerald' : 'text-red'
								}`}
						>
							{isVerified ? 'Verified' : 'Required'}
						</div>
					</div>
					{showInput && !isVerified && !showSuccess ? (
						<div className="mt-2">
							<p className="text-lgresp font-light text-white">{description}</p>
							{!emailSent ? (
								<input
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="max-w-[410px] w-full h-[37px] mt-3 px-5 bg-primary rounded-[5px] font-light text-mainwhite drop-shadow-custom-black outline-none placeholder-placeholder"
								/>
							) : (
								<input
									type="text"
									placeholder="Enter verification code"
									value={code}
									onChange={(e) => setCode(e.target.value)}
									className="max-w-[410px] w-full h-[49px] mt-3 px-5 bg-bageColor rounded-[5px] font-light text-mainwhite outline-none placeholder-checkboxColor"
								/>
							)}
							{error && <p className="mt-2 text-red text-sm">{error}</p>}
						</div>
					) : (
						<p className="mt-2 text-lgresp font-light text-white">{description}</p>
					)}
				</div>

				{/* Правая часть: кнопка */}
				{showInput && !isVerified && !showSuccess && (
					<div className="max-w-[123px] w-full flex items-end">
						{!emailSent ? (
							<button
								onClick={handleSendEmail}
								className="w-full px-5 h-[37px] text-sm  bg-transparent shadow-md rounded-[5px] border border-checkboxColor hover:bg-secondary hover:border-none transition-all duration-300 ease-in-out"
								disabled={loading}
							>
								{loading ? 'Sending...' : 'Verify Now'}
							</button>
						) : (
							<button
								onClick={handleVerifyCode}
								className="w-full h-[37px] px-5 text-sm bg-transparent shadow-md rounded-[5px] border border-checkboxColor hover:bg-secondary hover:border-none transition-all duration-300 ease-in-out"
								disabled={loading}
							>
								{loading ? 'Verifying...' : 'Verify Code'}
							</button>
						)}
					</div>
				)}
			</div>
			<Toaster />
		</div>
	)
}