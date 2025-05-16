'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import Select, { components, OptionProps, SingleValue, SingleValueProps, MenuProps, InputProps } from 'react-select'
import { StylesConfig } from 'react-select'
import { useBalance } from '@/app/hooks/useBalance'

interface CurrencyOption {
	value: string
	label: string
	icon: string
}

interface CurrencySelectProps {
	value?: CurrencyOption | null
	onChange?: (currency: CurrencyOption) => void
	styles?: StylesConfig<CurrencyOption, false>
}

export default function CurrencySelect({ value, onChange, styles }: CurrencySelectProps) {
	const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption | null>(null)
	const { balance, isBalanceLoading } = useBalance()
	const inputRef = useRef<HTMLInputElement>(null)

	const options: CurrencyOption[] = useMemo(
		() => [
			{ value: 'CBRC', label: 'CBRC', icon: '/icons/currencies/cbrc.svg' },
			{ value: 'BTC', label: 'BTC', icon: '/icons/currencies/bitcoin.svg' },
			{ value: 'ETH', label: 'ETH', icon: '/icons/currencies/ethereum.svg' },
			{ value: 'LTC', label: 'LTC', icon: '/icons/currencies/litecoin.svg' },
			{ value: 'SOL', label: 'SOL', icon: '/icons/currencies/solana.svg' },
		],
		[]
	)

	useEffect(() => {
		setSelectedCurrency(value || options[0])
	}, [value, options])

	const CustomOption = (props: OptionProps<CurrencyOption>) => {
		const inputValue = props.selectProps.inputValue || ''
		const label = props.data.label
		const highlightedLabel = inputValue
			? label.replace(
				new RegExp(`(${inputValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'),
				'<strong>$1</strong>'
			)
			: label

		return (
			<components.Option {...props}>
				<div className="flex mx-auto items-center gap-[10px] justify-between max-w-[271px] w-full cursor-pointer">
					<div className="flex items-center gap-[10px]">
						<Image src={props.data.icon} alt={props.data.label} width={20} height={20} />
						<p
							className="text-sm font-light"
							dangerouslySetInnerHTML={{ __html: highlightedLabel }}
						/>
					</div>
					<p className="text-center text-sm text-checkboxColor">
						{isBalanceLoading ? 'Loading...' : balance?.balance ?? '0'}
					</p>
				</div>
			</components.Option>
		)
	}

	const CustomSingleValue = (props: SingleValueProps<CurrencyOption>) => (
		<components.SingleValue {...props}>
			<div className="flex items-center gap-[10px] w-[162px] cursor-pointer">
				<Image src={props.data.icon} alt={props.data.label} width={20} height={20} />
				<span className="text-center text-mainwhite text-sm">
					{isBalanceLoading ? 'Loading...' : balance?.balance ?? '0'}
				</span>
			</div>
		</components.SingleValue>
	)

	const CustomInput = (props: InputProps<CurrencyOption, false>) => (
		<components.Input {...props} style={{ display: 'none' }} />
	)

	const CustomMenu = (props: MenuProps<CurrencyOption, false>) => {
		const { selectProps, children } = props
		const { inputValue, onInputChange } = selectProps

		const focusedOption = (props.options[0] as CurrencyOption) || options[0]

		return (
			<components.Menu {...props}>
				<div className="p-[15px] flex items-center bg-darkBlue">
					{/* <Image src="/icons/search.svg" alt="Search" width={16} height={16} /> */}
					<input
						ref={inputRef}
						type="text"
						placeholder="Search currency..."
						value={inputValue || ''}
						onChange={(e) => {
							console.log('Input value:', e.target.value)
							onInputChange(e.target.value, {
								action: 'input-change',
								prevInputValue: inputValue || '',
							})
						}}
						className="w-full bg-[#0F212E] text-white text-sm p-2 rounded-[5px] focus:border-emerald border border-bageColor hover:border-emerald"
						autoFocus
					/>
				</div>
				<components.MenuList
					{...props}
					maxHeight={319}
					focusedOption={focusedOption}
				>
					{children}
				</components.MenuList>
			</components.Menu>
		)
	}

	return (
		<Select<CurrencyOption>
			options={options}
			onChange={(option: SingleValue<CurrencyOption>) => {
				if (option) {
					setSelectedCurrency(option)
					onChange?.(option)
				}
			}}
			value={selectedCurrency}
			styles={styles}
			components={{
				Option: CustomOption,
				SingleValue: CustomSingleValue,
				Input: CustomInput,
				Menu: CustomMenu,
			}}
			menuPortalTarget={document.body}
			menuPosition="fixed"
			isSearchable={true}
			filterOption={(option, inputValue) => {
				console.log('Filtering:', option.data.label, inputValue)
				return option.data.label.toLowerCase().includes(inputValue.toLowerCase())
			}}
		/>
	)
}