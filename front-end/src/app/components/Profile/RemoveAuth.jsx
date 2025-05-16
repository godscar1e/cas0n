'use client'

import { useState, useRef } from 'react'
import { toast } from 'sonner'


export default function RemoveAuth({ userId, twoFAService, onClose }) {
	const [values, setValues] = useState(Array(6).fill(''))
	const inputRefs = useRef([])

	const handleChange = (index, value) => {
		if (value === '' || (/^\d$/.test(value) && value.length <= 1)) {
			const newValues = [...values]
			newValues[index] = value
			setValues(newValues)

			if (value && index < 5) {
				inputRefs.current[index + 1].focus()
			}
		}
	}

	const handleKeyDown = (index, e) => {
		if (e.key === 'Backspace' && !values[index] && index > 0) {
			inputRefs.current[index - 1].focus()
		}
	}

	const handleBackgroundClick = (e) => {
		if (e.target === e.currentTarget && onClose) {
			onClose()
		}
	}

	const handleRemoveVerify = async () => {
		if (!userId) {
			console.error('User data is not available yet')
			toast.error('User data is not available yet')
			return
		}

		const token = values.join('')

		try {
			const data = await twoFAService.verifyRemove2FA(userId, token)
			if (data.valid) {
				toast.success('✅ 2FA successfully removed')
				onClose()
				setTimeout(() => {
					window.location.reload()
				}, 2000)
			} else {
				toast.error('❌ Incorrect code')
			}
		} catch (error) {
			console.error('Error verifying 2FA for removal:', error)
			toast.error('Failed to remove 2FA')
		}
	}

	const isButtonDisabled = values.some(value => value === '')

	return (
		<div
			className="fixed inset-0 px-5 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onClick={handleBackgroundClick}
		>
			<div className="max-w-[600px] w-full h-auto px-[37px] pt-[55px] pb-10 text-center rounded-[15px] bg-primary">
				<h4 className='text-2xl'>To remove your <span className='text-emerald'>two factor authentication</span>, enter the code from the authenticator below</h4>

				<div className="max-w-[469px] w-full mt-6 mx-auto flex gap-[15px] justify-center">
					{values.map((value, index) => (
						<input
							key={index}
							type="number"
							value={value}
							onChange={(e) => handleChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							ref={(el) => (inputRefs.current[index] = el)}
							maxLength={1}
							className="w-[69px] h-[69px] rounded-[5px] text-5xl text-center text-emerald border border-checkboxColor bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						/>
					))}
				</div>
				<button
					onClick={handleRemoveVerify}
					disabled={isButtonDisabled}
					className={`max-w-[291px] w-full h-[42px] mt-[56px] px-5 text-lg text-white bg-secondary rounded-[5px] ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald'}`}
				>
					Complete
				</button>
			</div>
		</div>
	)
}