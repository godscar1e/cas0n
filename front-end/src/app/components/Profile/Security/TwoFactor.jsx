'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Toaster, toast } from 'sonner'

import { twoFAService } from '../../../services/UserVerifications/2fa-verification.service.ts'
import { useProfile } from '@/app/hooks/useProfile.ts'
import RemoveAuth from '../RemoveAuth.jsx'

export default function TwoFactor() {
	const { data: userData, isLoading } = useProfile()
	const [copied, setCopied] = useState(false)
	const [email, setEmail] = useState('forsteam12004@gmail.com')
	const [verification, setVerified] = useState(false)
	const [qrCode, setQrCode] = useState('')
	const [secret, setSecret] = useState('')
	const [token, setToken] = useState('')
	const [isValid, setIsValid] = useState(null)
	const [showRemoveAuth, setShowRemoveAuth] = useState(false)

	useEffect(() => {
		console.log('userData updated:', userData)
	}, [userData])

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(secret)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error("Ошибка копирования:", err)
		}
	}

	useEffect(() => {
		if (userData?.user?.isTwoFactorVerified === false) {
			generate2FA()
		} else if (userData?.user?.isTwoFactorVerified === true) {
			setVerified(true)
		}
	}, [userData])

	const generate2FA = async () => {
		try {
			const data = await twoFAService.generate2FA(email)
			setQrCode(data.qrCode)
			setSecret(data.secret)
		} catch (error) {
			console.error('Ошибка при генерации 2FA:', error)
		}
	}

	const verify2FA = async () => {
		if (!userData || !userData.user || !userData.user.id) {
			console.error('User data is not available yet')
			return
		}

		try {
			const data = await twoFAService.verify2FA(userData.user.id, secret, token)
			setIsValid(data.valid)
			if (data.valid) {
				toast.success('✅ Code successfully verified')
				setVerified(true)
				setTimeout(() => {
					window.location.reload()
				}, 2000)
			} else {
				toast.error('❌ Incorrect code')
			}
		} catch (error) {
			console.error('Ошибка при проверке 2FA:', error)
			toast.error('Произошла ошибка при проверке')
		}
	}

	const handleRemoveClick = () => {
		setShowRemoveAuth(true)
	}

	const handleCloseRemoveAuth = () => {
		setShowRemoveAuth(false)
	}

	const isButtonDisabled = token.length !== 6

	return (
		<div className="w-full h-auto mt-10 px-10 pt-5 pb-6 rounded-[5px] border border-placeholder">
			<div className={userData?.user?.isTwoFactorVerified === true ? '' : 'pb-5 border-b border-b-primary'}>
				{userData?.user?.isTwoFactorVerified === true ? (
					<div className="flex gap-5 justify-between items-center">
						<div>
							<div className="flex gap-5 items-center">
								<h3 className='text-xl text-mainwhite leading-6'>Two Factor</h3>
								<div className='max-w-[101px] w-full h-6 px-2 border border-placeholder rounded-md flex items-center justify-center font-extralight text-emerald'>
									Verified
								</div>
							</div>
							<h4 className='mt-[10px] text-lg text-checkboxColor'>To keep your account extra secure leave a two factor authentication enabled.</h4>
						</div>
						<div className="max-w-[350px] w-full text-sm text-white">
							<button
								onClick={handleRemoveClick}
								className='w-full pb-[9px] text-left flex justify-between items-center border-b border-placeholder hover:text-emerald'
							>
								<div className="flex gap-[10px]">
									<Image src='/icons/bin-ico.svg' width={13} height={17} alt='' />
									<p>Remove my two factor authentication</p>
								</div>
								<Image src='/icons/green-arrow-ico.svg' width={17} height={17} alt='' />
							</button>
							<button className='w-full mt-[9px] text-left flex justify-between items-center hover:text-emerald'>
								<div className="flex gap-[10px]">
									<Image src='/icons/remove-ico.svg' width={14} height={17} alt='' />
									<p>I lost access to my two factor authentication</p>
								</div>
								<Image src='/icons/green-arrow-ico.svg' width={17} height={17} alt='' />
							</button>
						</div>
					</div>
				) : (
					<>
						<div className="">
							<div className="pb-5 border-b border-primary">
								<h3 className='text-xl text-mainwhite leading-6'>Two Factor</h3>
								<h4 className='mt-[10px] text-lg text-checkboxColor'>To keep your account extra secure leave a two factor authentication enabled.</h4>
							</div>
							<div className="mt-5">
								<p className='text-lg text-checkboxColor'>Copy this code to your authenticator app</p>
								<div className="flex gap-5 justify-between items-center max-w-[623px] w-full h-[37px] mt-[10px] px-5 border border-checkboxColor rounded-[5px]">
									<p>{secret}</p>
									<button onClick={handleCopy} className="relative">
										<Image src="/icons/copy.svg" width={15} height={19} alt="copy" />
									</button>
								</div>
							</div>
						</div>

						<div className="mt-10">
							<h4 className='text-lg leading-[22px] text-checkboxColor'>Don't let anyone see this!</h4>
						</div>
						<div className="flex gap-6 mt-5">
							{qrCode && <img className='rounded-[5px] max-w-[214px] w-full h-[214px]' src={qrCode} alt="QR Code" />}
							<div className="flex flex-col gap-[10px] max-w-[410px] w-full">
								<label htmlFor="" className='text-lg text-checkboxColor'>
									Two Factor Code
									<span className='text-red'> *</span>
								</label>
								<input
									type="text"
									placeholder="Enter the authentication code from the app..."
									value={token}
									onChange={(e) => setToken(e.target.value)}
									className='w-full h-[37px] px-5 drop-shadow-custom-black placeholder-placeholder text-white bg-primary rounded-[5px]'
								/>
							</div>
						</div>
					</>
				)}
			</div>
			{userData?.user?.isTwoFactorVerified === false && (
				<div className="max-w-[164px] w-full mt-5 ml-auto">
					<button
						onClick={verify2FA}
						disabled={isButtonDisabled}
						className={`h-[37px] px-4 rounded-[5px] drop-shadow-custom-black w-full transition-colors duration-200 border border-checkboxColor hover:bg-mainwhite hover:text-primary ${isButtonDisabled ? ' cursor-not-allowed' : 'hover: bg-secondary border-none'}`}
					>
						Submit changes
					</button>
				</div>
			)}
			{showRemoveAuth && <RemoveAuth userId={userData?.user?.id} twoFAService={twoFAService} onClose={handleCloseRemoveAuth} />}
		</div>
	)
}