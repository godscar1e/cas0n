'use client'

import { useEffect, useState } from 'react'
import { useProfile } from '../../../hooks/useProfile'
import { VerificationItem } from './VerificationItem'
import BasicVerification from './BasicVerification'

// import RemoveAuth from './RemoveAuth'

export default function Verify() {
	const [emailVerification, setEmailVerification] = useState(false)
	const [basicInfoVerified, setBasicInfoVerified] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { data: userData, isLoading } = useProfile()

	useEffect(() => {
		if (userData) {
			setEmailVerification(userData.user.isEmailVerified)
			setBasicInfoVerified(userData.user.isBasicVerified)
		}
	}, [userData])

	const handleOpenModal = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		window.location.reload()
	}

	const handleVerifyBasicInfo = () => {
		setBasicInfoVerified(true)
		setIsModalOpen(false)
	}

	return (
		<div>
			<VerificationItem
				title="Email Verification"
				description="Verify your email to receive important communication."
				isVerified={emailVerification}
				showInput={true}
				onVerify={() => setEmailVerification(true)}
			/>
			<div className="flex justify-between gap-5 items-center mt-5 px-10 py-5 border border-placeholder rounded-md max-[600px]:flex-wrap">
				<div className="w-full">
					<div className="flex items-center gap-5">
						<h5 className="text-xlresp font-medium">Level 1 Verification: Basic Information</h5>
						<div
							className={`max-w-[101px] w-full h-6 px-2 border border-placeholder rounded-md flex items-center self-start justify-center font-extralight ${basicInfoVerified ? 'text-emerald' : 'text-red'
								}`}
						>
							{basicInfoVerified ? 'Verified' : 'Required'}
						</div>
					</div>
					<p className="mt-2 text-lgresp font-light text-white">
						Fill in your details for us to get to know you better.
					</p>
				</div>
				{!basicInfoVerified && (
					<button
						className="max-w-[123px] w-full h-[37px] px-5 text-sm bg-transparent shadow-md rounded-[5px] border border-checkboxColor hover:bg-secondary hover:border-none transition-all duration-300 ease-in-out"
						onClick={handleOpenModal}
					>
						Verify Now
					</button>
				)}
			</div>
			<VerificationItem
				title="Level 2 Verification: Identity Verification"
				description="Upload a copy of your ID."
				isVerified={emailVerification} // Здесь можно добавить отдельное состояние
				showInput={false} // Пока без формы
			/>
			{isModalOpen && (
				<BasicVerification onClose={handleCloseModal} onVerify={handleVerifyBasicInfo} />
			)}
			{/* <RemoveAuth /> */}
		</div>
	)
}