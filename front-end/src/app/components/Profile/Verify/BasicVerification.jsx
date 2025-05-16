'use client'
import { useState } from 'react'
import countries from '../../../utils/countries'
import months from '../../../utils/months'
import { basicVerificationService } from '../../../services/UserVerifications/basic-verification.service'
import SuccessWindow from '../SuccessWindow'

export default function BasicVerification({ onClose, onVerify }) {
	const [selectedCountry, setSelectedCountry] = useState('')
	const [selectedMonth, setSelectedMonth] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [day, setDay] = useState('')
	const [year, setYear] = useState('')

	const labelClasses = 'block ml-[10px] text-mainwhite text-lg'
	const inputClasses =
		'w-full h-[49px] mt-[10px] px-5 bg-bageColor rounded-[5px] font-light text-mainwhite outline-none placeholder-checkboxColor'

	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)
		setSuccess(null)
		setIsLoading(true)

		if (!selectedCountry || !firstName || !lastName || !day || !selectedMonth || !year) {
			setError('Please fill in all fields.')
			setIsLoading(false)
			return
		}

		const dayNum = parseInt(day, 10)
		if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
			setError('Day must be a number between 1 and 31.')
			setIsLoading(false)
			return
		}

		const yearNum = parseInt(year, 10)
		const currentYear = new Date().getFullYear()
		if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
			setError(`Year must be a number between 1900 and ${currentYear}.`)
			setIsLoading(false)
			return
		}

		const formData = {
			country: selectedCountry,
			firstName,
			lastName,
			dateOfBirth: {
				day: dayNum,
				month: selectedMonth,
				year: yearNum,
			},
		}

		console.log('Sending formData:', formData)

		try {
			const response = await basicVerificationService.submitBasicVerification(formData)
			console.log('Response from server:', response)
			setSuccess(response.message) // Устанавливаем сообщение об успехе

		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'An error occurred while submitting. Please try again.'
			setError(errorMessage)
			console.error('Submission error:', err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex items-center justify-center z-50">
			{success ? (
				<SuccessWindow
					title='Your Basic Information verification is completed'
					highlightedText='Basic Information'
					highlightColor="text-emerald"
					onClose={onClose}
				/>
			) : (
				<div className="max-w-[600px] w-full h-auto bg-primary rounded-[15px] p-[60px]">
					<div className="flex justify-between items-center">
						<h2 className="text-[32px] leading-[39px] font-medium">Basic Verification</h2>
						<button onClick={onClose} className="text-white text-xl">
							×
						</button>
					</div>
					<p className="mt-[5px] text-lg text-checkboxColor">Fill in your personal information</p>
					// Отображаем форму, если верификация еще не успешна
					<form className="mt-10" onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className={labelClasses}>Country</label>
							<select
								className={`${inputClasses} custom-select`}
								value={selectedCountry}
								onChange={(e) => setSelectedCountry(e.target.value)}
								disabled={isLoading}
							>
								<option value="" disabled>
									Select a country
								</option>
								{countries.map((country) => (
									<option key={country} value={country}>
										{country}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className={labelClasses}>First Name</label>
							<input
								type="text"
								className={inputClasses}
								placeholder="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								disabled={isLoading}
							/>
						</div>
						<div className="mb-4">
							<label className={labelClasses}>Last Name</label>
							<input
								type="text"
								className={inputClasses}
								placeholder="Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								disabled={isLoading}
							/>
						</div>
						<div className="mb-4">
							<label className={labelClasses}>Date of Birth</label>
							<div className="flex gap-2">
								<input
									type="text"
									placeholder="Day"
									className={`${inputClasses} w-1/3`}
									value={day}
									onChange={(e) => setDay(e.target.value)}
									disabled={isLoading}
								/>
								<select
									className={`${inputClasses} w-1/3 custom-select`}
									value={selectedMonth}
									onChange={(e) => setSelectedMonth(e.target.value)}
									disabled={isLoading}
								>
									<option value="" disabled>
										Month
									</option>
									{months.map((month) => (
										<option key={month} value={month}>
											{month}
										</option>
									))}
								</select>
								<input
									type="text"
									placeholder="Year"
									className={`${inputClasses} w-1/3`}
									value={year}
									onChange={(e) => setYear(e.target.value)}
									disabled={isLoading}
								/>
							</div>
						</div>
						{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
						{success && <p className="text-green-500 text-sm mt-2">{success}</p>}
						<button
							type="submit"
							className="w-full h-[60px] mt-10 bg-secondary shadow-md rounded-[5px] text-2xl text-white disabled:opacity-50"
							disabled={isLoading}
						>
							{isLoading ? 'Submitting...' : 'Complete'}
						</button>
					</form>
				</div>
			)}
		</div>
	)
}