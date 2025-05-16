'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FormField } from '@/app/components/ui/Crypto/FormField'
import { Button } from '@/app/components/ui/Crypto/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomSelect } from '../../ui/Crypto/Select'
import { currencyOptions } from '@/app/utils/currencies/currencies'
import Label from '../../ui/Crypto/Label'

// Define currency fee mapping
const currencyFeeMapping = {
	bitcoin: { fee: '0.00006000 BTC', network: 'Bitcoin (BTC)' },
	ethereum: { fee: '0.0015 ETH', network: 'Ethereum (ETH)' },
}

const withdrawSchema = z.object({
	currency: z.string().min(1, 'Currency is required'),
	network: z.string().min(1, 'Network is required'),
	address: z.string().min(1, 'Address is required'),
	amount: z.string().min(1, 'Amount is required'),
})

type WithdrawFormValues = z.infer<typeof withdrawSchema>

export const WithdrawForm: React.FC = () => {
	const [selectedCurrency, setSelectedCurrency] = useState('bitcoin')

	const { register, handleSubmit, formState: { errors } } = useForm<WithdrawFormValues>({
		resolver: zodResolver(withdrawSchema),
		defaultValues: {
			amount: '',
			address: '',
			network: ''
		}
	})

	const onSubmit = (data: WithdrawFormValues) => {
		console.log('Withdraw data:', data)
	}

	// Get current currency info
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
						onChange={(value) => setSelectedCurrency(value)}
						placeholder="Select currency"
					/>
				</FormField>

				<FormField>
					<Label content="Network*" />
					<input
						type="text"
						className="w-full h-[45px] mt-[10px] px-5 border border-placeholder rounded-[5px] bg-transparent"
						{...register('network')}
					/>
				</FormField>

				<FormField>
					<Label content={`${currentCurrencyInfo.network} Address*`} />
					<input
						type="text"
						className="w-full h-[45px] mt-[10px] px-5 border border-placeholder rounded-[5px] bg-transparent"
						placeholder='Enter address'
						{...register('address')}
					/>
				</FormField>

				<FormField>
					<div className="flex w-full justify-between items-center">
						<Label content="Amount*" />
						<p className='text-placeholder'>0.00 USD</p>
					</div>
					<input
						type="text"
						className="w-full h-[45px] mt-[10px] px-5 border border-placeholder rounded-[5px] bg-transparent"
						placeholder='Enter amount'
						{...register('amount')}
					/>

					<div className="flex justify-between gap-3 mt-[10px]">
						<button className='w-full h-[35px] px-5 border border-placeholder rounded-[5px] bg-transparent font-light'>25%</button>
						<button className='w-full h-[35px] px-5 border border-placeholder rounded-[5px] bg-transparent font-light'>50%</button>
						<button className='w-full h-[35px] px-5 border border-placeholder rounded-[5px] bg-transparent font-light'>75%</button>
						<button className='w-full h-[35px] px-5 border border-placeholder rounded-[5px] bg-transparent font-light'>MAX</button>
					</div>
				</FormField>

				<div className="mt-[-5px]">
					<div className="flex gap-2">
						<Image src='/icons/warnings/green-warning.svg' width={17} height={17} alt='' />
						<p className='text-sm text-mainwhite font-light leading-[17px]'>
							Withdrawal Fee: {currentCurrencyInfo.fee}
						</p>
					</div>
					<div className="flex gap-2 mt-[10px]">
						<Image src='/icons/warnings/shield.svg' width={14} height={17} alt='' />
						<p className='text-sm text-mainwhite font-light leading-[17px]'>
							Your withdrawal will be processed on {currentCurrencyInfo.network}.
						</p>
					</div>
				</div>

				<Button variant="success" type="submit" fullWidth>
					Withdraw
				</Button>
			</form>
		</div>
	)
}