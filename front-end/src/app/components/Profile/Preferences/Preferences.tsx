'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Select, { components, OptionProps, SingleValue, SingleValueProps } from 'react-select'
import { customStyles } from './SelectStyles'
import { useProfile } from '@/app/hooks/useProfile'
import axios from 'axios'
import ToggleSwitch from '../../ui/ToggleSwitch'

// Интерфейс для опции
interface CurrencyOption {
	value: string
	label: string
	icon: string
}

// Интерфейс для пропсов PreferenceItem
interface PreferenceItemProps {
	title: string
	description: string
	showCurrencySelect?: boolean
	selectedCurrency?: string
	onCurrencyChange?: (value: string) => void
	isOn: boolean
	onToggle: () => void
}

const options: CurrencyOption[] = [
	{ value: 'CBRC', label: 'CBRC', icon: '/icons/currencies/cbrc.svg' },
	{ value: 'BTC', label: 'BTC', icon: '/icons/currencies/bitcoin.svg' },
	{ value: 'ETH', label: 'ETH', icon: '/icons/currencies/ethereum.svg' },
	{ value: 'LTC', label: 'LTC', icon: '/icons/currencies/litecoin.svg' },
	{ value: 'SOL', label: 'SOL', icon: '/icons/currencies/solana.svg' },
]

// Кастомный компонент для отображения опции в выпадающем списке
const CustomOption = (props: OptionProps<CurrencyOption>) => (
	<components.Option {...props}>
		<div className="flex mx-auto items-center gap-[10px] max-w-[100px] w-full cursor-pointer">
			<Image src={props.data.icon} alt={props.data.label} width={30} height={30} />
			<span className="w-[60px] text-center text-lg font-light">{props.data.label}</span>
		</div>
	</components.Option>
)

// Кастомный компонент для отображения выбранной опции
const CustomSingleValue = (props: SingleValueProps<CurrencyOption>) => (
	<components.SingleValue {...props}>
		<div className="flex items-center gap-[10px] max-w-[100px] w-full">
			<Image src={props.data.icon} alt={props.data.label} width={30} height={30} />
			<span className="w-[60px] text-center text-lg font-light">{props.data.label}</span>
		</div>
	</components.SingleValue>
)

const PreferenceItem = ({
	title,
	description,
	showCurrencySelect = false,
	selectedCurrency,
	onCurrencyChange,
	isOn,
	onToggle,
}: PreferenceItemProps) => {
	return (
		<div className="max-w-[1129px] w-full py-5 flex items-center justify-between border-b border-b-primary last:border-b-0">
			<ToggleSwitch
				width={38}
				height={22}
				isOn={isOn}
				onToggle={onToggle}
			/>
			<div className="flex-1 ml-[23px]">
				<h4 className="text-lg text-mainwhite font-light">{title}</h4>
				<p className="text-sm text-checkboxColor font-light">{description}</p>
			</div>
			{showCurrencySelect && (
				<div className="relative max-w-[153px] w-full">
					<Select<CurrencyOption>
						options={options}
						onChange={(option: SingleValue<CurrencyOption>) => {
							if (onCurrencyChange && option) {
								onCurrencyChange(option.value)
							}
						}}
						value={options.find((opt) => opt.value === selectedCurrency)}
						styles={customStyles}
						components={{
							Option: CustomOption,
							SingleValue: CustomSingleValue, // Добавляем кастомный SingleValue
						}}
					/>
				</div>
			)}
		</div>
	)
}

export default function Preferences() {
	const { data: userData, isLoading } = useProfile()
	const [selectedCurrency, setSelectedCurrency] = useState('')
	const [preferences, setPreferences] = useState({
		flatView: false,
		privateMode: false,
		emailMarketing: false,
		streamerMode: false,
		hideZeroBalances: false,
	})

	// Установка начального значения валюты на основе userData
	useEffect(() => {
		if (userData?.user?.currency) {
			setSelectedCurrency(userData.user.currency)
		}
	}, [userData])

	// Обработчик изменения валюты
	const handleCurrencyChange = async (newCurrency: string) => {
		setSelectedCurrency(newCurrency)

		try {
			await axios.put(
				`http://localhost:4200/api/user/profile/${userData?.user.id}/currency`,
				{
					currency: newCurrency,
				}
			)
		} catch (error) {
			console.error('Ошибка при обновлении валюты:', error)
		}
	}

	// Обработчик переключения настроек
	const handleToggle = (key: keyof typeof preferences) => {
		setPreferences((prev) => ({
			...prev,
			[key]: !prev[key],
		}))
	}

	if (isLoading) {
		return <div className="text-mainwhite">Loading...</div>
	}

	return (
		<div className="mt-10">
			<h1 className="ml-[15px] text-2xl text-mainwhite leading-6">Preferences</h1>
			<div className="w-full h-auto mt-5 border border-placeholder rounded-[5px] px-10 pb-[10px]">
				<PreferenceItem
					title="Flat View"
					description="Balances will be displayed in your selected currency"
					showCurrencySelect={true}
					selectedCurrency={selectedCurrency}
					onCurrencyChange={handleCurrencyChange}
					isOn={preferences.flatView}
					onToggle={() => handleToggle('flatView')}
				/>
				<PreferenceItem
					title="Private Mode"
					description="Other users won't be able to view your wins, losses and wagered statistics"
					isOn={preferences.privateMode}
					onToggle={() => handleToggle('privateMode')}
				/>
				<PreferenceItem
					title="Email marketing"
					description="Receive notifications for offers and promotions. Critical information regarding your account will always be sent"
					isOn={preferences.emailMarketing}
					onToggle={() => handleToggle('emailMarketing')}
				/>
				<PreferenceItem
					title="Streamer Mode"
					description="Receive notifications for offers and promotions. Critical information regarding your account will always be sent"
					isOn={preferences.streamerMode}
					onToggle={() => handleToggle('streamerMode')}
				/>
				<PreferenceItem
					title="Hide zero balances"
					description="Wallets with zero balance are hidden from view"
					isOn={preferences.hideZeroBalances}
					onToggle={() => handleToggle('hideZeroBalances')}
				/>
			</div>
		</div>
	)
}