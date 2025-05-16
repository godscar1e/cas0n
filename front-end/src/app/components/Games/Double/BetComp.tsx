'use client'

import { useState } from 'react'

interface BetComponentProps {
	betAmount: number
	setBetAmount: (amount: number) => void
}

export default function BetComponent({ betAmount, setBetAmount }: BetComponentProps) {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value)
		setBetAmount(isNaN(value) ? 0 : value)
	}

	const handleIncrement = (amount: number) => {
		setBetAmount(betAmount + amount)
	}

	const handleClear = () => {
		setBetAmount(0)
	}

	const handleMax = () => {
		// Assume max bet is 10000 for now
		setBetAmount(10000)
	}

	return (
		<div className="flex justify-between items-center h-[50px] px-3 mt-5 rounded-[10px] bg-darkBlue">
			<div>
				<input
					type="number"
					className='h-[34px] px-[10px] text-xs placeholder:text-placeholder rounded-[10px] bg-secondBlue'
					placeholder='Bet amount'
					value={betAmount > 0 ? betAmount : ''}
					onChange={handleInputChange}
					min="0"
					step="0.01"
				/>
			</div>
			<div className="flex h-[35px] text-xs font-medium text-checkboxColor">
				<button className='pr-5 border-r border-r-placeholder' onClick={handleClear}>Clear</button>
				<div className="flex gap-[10px] max-w-[411px] w-full pl-5">
					<button className='px-[14px] rounded-[10px] bg-secondBlue'>Previous</button>
					<button className='px-[14px] rounded-[10px] bg-secondBlue' onClick={() => handleIncrement(1)}>+1</button>
					<button className='px-[14px] rounded-[10px] bg-secondBlue' onClick={() => handleIncrement(10)}>+10</button>
					<button className='px-[14px] rounded-[10px] bg-secondBlue' onClick={() => handleIncrement(100)}>+100</button>
					<button className='px-[14px] rounded-[10px] bg-secondBlue' onClick={() => handleIncrement(1000)}>+1000</button>
					<button className='px-[14px] rounded-[10px] bg-secondBlue' onClick={handleMax}>Max</button>
				</div>
			</div>
		</div>
	)
}