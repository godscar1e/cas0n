'use client'

import { useState } from 'react'
import { userService } from '@/app/services/user.service'
import { useProfile } from '@/app/hooks/useProfile'

import { Toaster, toast } from 'sonner'

export default function Password() {
	const { data: userData, isLoading } = useProfile()
	const [formData, setFormData] = useState({
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: ''
	})
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)

	const isFormValid = formData.oldPassword.trim() !== '' &&
		formData.newPassword.trim() !== '' &&
		formData.confirmNewPassword.trim() !== ''

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)
		setSuccess(null)

		// Проверка соответствия новых паролей
		if (formData.newPassword !== formData.confirmNewPassword) {
			setError('New passwords do not match')
			return
		}

		try {
			const userId = userData?.user?.id
			await userService.updatePassword(userId, {
				oldPassword: formData.oldPassword,
				newPassword: formData.newPassword
			})
			setSuccess('Password updated successfully')
			setFormData({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
			toast.success('Password changed successfully!')
		} catch (err) {
			setError('Failed to update password. Please try again.')
		}
	}

	return (
		<div className="w-full h-auto mt-10 px-10 py-5 rounded-[5px] border border-placeholder">
			<Toaster />
			<h3 className="text-xl text-mainwhite leading-6">Password</h3>
			<div className="mt-5">
				<div className="pb-5 border-b border-b-primary">
					<form id="password-form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-[10px] max-w-[410px]">
							<label className="ml-[10px] text-lg text-checkboxColor">
								Old Password <span className="text-red">*</span>
							</label>
							<input
								type="password"
								name="oldPassword"
								value={formData.oldPassword}
								onChange={handleChange}
								className="h-[37px] px-5 rounded-[5px] bg-primary drop-shadow-custom-black placeholder-placeholder outline-none"
								placeholder="Old Password"
							/>
						</div>
						<div className="flex flex-col gap-[10px] max-w-[410px]">
							<label className="ml-[10px] text-lg text-checkboxColor">
								New Password <span className="text-red">*</span>
							</label>
							<input
								type="password"
								name="newPassword"
								value={formData.newPassword}
								onChange={handleChange}
								className="h-[37px] px-5 rounded-[5px] bg-primary drop-shadow-custom-black placeholder-placeholder outline-none"
								placeholder="New Password"
							/>
						</div>
						<div className="flex flex-col gap-[10px] max-w-[410px]">
							<label className="ml-[10px] text-lg text-checkboxColor">
								Confirm New Password <span className="text-red">*</span>
							</label>
							<input
								type="password"
								name="confirmNewPassword"
								value={formData.confirmNewPassword}
								onChange={handleChange}
								className="h-[37px] px-5 rounded-[5px] bg-primary drop-shadow-custom-black placeholder-placeholder outline-none"
								placeholder="Confirm New Password"
							/>
						</div>
						{error && <p className="text-red text-sm">{error}</p>}
						{/* {success && <p className="text-green-500 text-sm">{success}</p>} */}
					</form>
				</div>
				<div className="max-w-[164px] w-full mt-5 ml-auto">
					<button
						type="submit"
						className={`h-[37px] px-4 rounded-[5px] drop-shadow-custom-black w-full transition-colors duration-200 border border-checkboxColor hover:bg-mainwhite hover:text-primary  ${isFormValid
							? 'bg-secondary text-white border-none hover:bg-green-600'
							: 'bg-transparent cursor-not-allowed'
							}`}
						form="password-form"
						disabled={!isFormValid}
					>
						Submit changes
					</button>
				</div>
			</div>
		</div>
	)
}