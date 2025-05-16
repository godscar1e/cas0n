"use client"

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const icons = {
	bitcoin: "/icons/currencies/bitcoin.svg",
	ethereum: "/icons/currencies/ethereum.svg",
	solana: "/icons/currencies/solana.svg",
	litecoin: "/icons/currencies/litecoin.svg",
} as const

type IconType = keyof typeof icons

type Option = {
	value: string
	label: string
	icon: IconType
}

type CustomSelectProps = {
	options: Option[]
	value: string
	onChange: (value: string) => void
	placeholder?: string
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
	options,
	value,
	onChange,
	placeholder = "Select an option"
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const selectRef = useRef<HTMLDivElement>(null)

	const selectedOption = options.find(opt => opt.value === value)

	// Закрытие дропдауна при клике вне компонента
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className="relative w-full mt-[10px]" ref={selectRef}>
			<div
				className="flex items-center justify-between w-full p-2 h-[45px] px-5 border border-placeholder rounded-[5px] bg-transparent cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="flex items-center">
					{selectedOption ? (
						<>
							<Image
								src={icons[selectedOption.icon]}
								width={20}
								height={20}
								alt={selectedOption.label}
								className="mr-2"
							/>
							<span>{selectedOption.label}</span>
						</>
					) : (
						<span className="text-gray-400">{placeholder}</span>
					)}
				</div>
				<div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
					<Image
						src="/icons/select-arrow.svg"
						width={12}
						height={12}
						alt="Toggle dropdown"
					/>
				</div>
			</div>

			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-primary rounded-[5px] shadow-lg">
					{options.map((option) => (
						<div
							key={option.value}
							className="flex items-center p-2 hover:bg-slate-700 rounded-[5px] cursor-pointer"
							onClick={() => {
								onChange(option.value)
								setIsOpen(false)
							}}
						>
							<Image
								src={icons[option.icon]}
								width={20}
								height={20}
								alt={option.label}
								className="mr-2"
							/>
							<span>{option.label}</span>
						</div>
					))}
				</div>
			)}
		</div>
	)
}