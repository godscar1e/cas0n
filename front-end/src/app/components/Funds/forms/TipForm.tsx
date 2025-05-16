'use client'

import React, { useState } from 'react'
import { FormField } from '@/app/components/ui/Crypto/FormField'
import { Button } from '@/app/components/ui/Crypto/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProfile } from '@/app/hooks/useProfile'
import { CustomSelect } from '../../ui/Crypto/Select'
import { currencyOptions } from '@/app/utils/currencies/currencies'
import Label from '../../ui/Crypto/Label'
import ToggleSwitch from '../../ui/ToggleSwitch'
import tipService from '@/app/services/transactions/tip.service'
import { toast } from 'sonner'
import { userService } from '@/app/services/user.service'

const currencyFeeMapping = {
	bitcoin: { fee: '0.00006000 BTC', network: 'Bitcoin (BTC)' },
	ethereum: { fee: '0.0015 ETH', network: 'Ethereum (ETH)' },
}

const tipSchema = z.object({
	currency: z.string().min(1, 'Currency is required'),
	username: z.string().min(1, 'Username is required'),
	amount: z
		.string()
		.min(1, 'Amount is required')
		.regex(/^\d*\.?\d+$/, 'Amount must be a valid number'),
	isPublic: z.boolean(),
})

type TipFormValues = z.infer<typeof tipSchema>

export const TipForm: React.FC = () => {
	const { data: userData, isLoading } = useProfile()
	const [selectedCurrency, setSelectedCurrency] = useState('bitcoin')
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TipFormValues>({
		resolver: zodResolver(tipSchema),
		defaultValues: {
			currency: 'bitcoin',
			username: '',
			amount: '',
			isPublic: false,
		},
	})

	const isPublic = watch('isPublic')

	const onSubmit = async (data: TipFormValues) => {
		setSubmitError(null)
		setIsSubmitting(true)

		try {
			// Получаем ID пользователя по username
			const userProfile = await userService.getIdByUsername(data.username)

			if (!userProfile.user?.id) {
				throw new Error('User not found')
			}

			const tipData = {
				type: 'tip',
				currency: data.currency,
				userId: userData?.user.id,
				userToId: userProfile.user.id, // вот здесь теперь передаём id
				amount: parseFloat(data.amount),
				isPublic: data.isPublic,
			}

			// await tipService.createTip(tipData)

			toast.success('Tip sent successfully!', {
				description: `${data.amount} ${data.currency.toUpperCase()} sent to ${data.username}`,
				duration: 5000,
				icon: '💸',
				style: {
					background: '#1e1e2f',
					color: '#fff',
					border: '1px solid #00ffcc',
				},
			})

			// Сброс значений формы
			setValue('username', '')
			setValue('amount', '')
			setValue('isPublic', false)
			setSelectedCurrency('bitcoin')
			setValue('currency', 'bitcoin')
		} catch (error: any) {
			console.error('Error submitting tip:', error)

			const message = error.response?.data?.message || error.message || 'Failed to send tip. Please try again.'
			setSubmitError(message)

			toast.error('Error sending tip', {
				description: message,
			})
		} finally {
			setIsSubmitting(false)
		}
	}


	const currentCurrencyInfo = currencyFeeMapping[selectedCurrency as keyof typeof currencyFeeMapping] ||
		currencyFeeMapping.bitcoin

	return (
		<div className="">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
				<FormField>
					<Label content="Currency" />
					<CustomSelect
						options={currencyOptions}
						value={selectedCurrency}
						onChange={(value) => {
							setSelectedCurrency(value)
							setValue('currency', value)
						}}
						placeholder="Select currency"
					/>
					{errors.currency && <p className="text-red-500">{errors.currency.message}</p>}
				</FormField>

				<FormField>
					<Label content="Username" />
					<input
						type="text"
						className="w-full h-[45px] mt-[10px] px-5 border border-placeholder rounded-[5px] bg-transparent"
						placeholder="Enter username"
						{...register('username')}
					/>
					{errors.username && <p className="text-red-500">{errors.username.message}</p>}
				</FormField>

				<FormField>
					<div className="flex w-full justify-between items-center">
						<Label content="Amount*" />
						<p className="text-placeholder">0.00 USD</p>
					</div>
					<input
						type="text"
						className="w-full h-[45px] mt-[10px] px-5 border border-placeholder rounded-[5px] bg-transparent"
						placeholder="Enter amount"
						{...register('amount')}
					/>
					{errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
				</FormField>

				<div className="flex gap-[15px] items-center">
					<ToggleSwitch
						width={53}
						height={30}
						isOn={isPublic}
						onToggle={() => setValue('isPublic', !isPublic)}
					/>
					<p className="text-mainwhite font-light">Public tip</p>
				</div>

				{submitError && <p className="text-red-500">{submitError}</p>}

				<Button
					variant="success"
					type="submit"
					fullWidth
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Sending...' : 'Send tip'}
				</Button>
			</form>
		</div>
	)
}
