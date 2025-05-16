'use client'

import React, { useState } from 'react'
import { FormField } from '@/app/components/ui/Crypto/FormField'
import { Button } from '@/app/components/ui/Crypto/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Label from '../../ui/Crypto/Label'
import Image from 'next/image'
import Link from 'next/link'
import { CustomSelect } from '../../ui/Crypto/Select'
import { currencyOptions } from '@/app/utils/currencies/currencies'

const depositSchema = z.object({
	currency: z.string().min(1, 'Currency is required'),
	address: z.string().min(1, 'Address is required'),
})

type DepositFormValues = z.infer<typeof depositSchema>

export const DepositForm: React.FC = () => {
	const [selectedCurrency, setSelectedCurrency] = useState('bitcoin')

	const { register, handleSubmit, formState: { errors } } = useForm<DepositFormValues>({
		resolver: zodResolver(depositSchema),
		defaultValues: {
			currency: 'bitcoin',
			address: 'bc1q2m7hptu8dfwyzn70d2ksn4rsye9x0df5xpr5nl',
		}
	})

	const onSubmit = (data: DepositFormValues) => {
		// Здесь был бы API-вызов для обработки депозита
		console.log('Deposit data:', data)
	}

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
					<Label content="Address" />
					<input
						type="text"
						className="w-full h-[45px] mt-[10px] px-5 border border-placeholder rounded-[5px] bg-transparent"
						{...register('address')}
					/>
					{errors.address && (
						<p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
					)}
				</FormField>

				<div className="flex gap-2">
					<Image src='/icons/warnings/red-warning.svg' width={17} height={17} alt='Warning' />
					<p className='text-sm font-light'>Your deposit must be sent on the {selectedCurrency.toUpperCase()} network to be processed.</p>
				</div>

				<Button variant="primary" type="submit" fullWidth>
					Deposit Now
				</Button>

				<Link href='/transactions/deposits' className='w-[129px] mx-auto border-b border-white text-center text-lg text-white font-light'>
					Deposit history
				</Link>
			</form>
		</div>
	)
}