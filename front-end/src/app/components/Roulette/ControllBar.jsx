'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Roulette.module.scss'
import { useChat } from '@/app/context/ChatContext'
import toast from '@/app/components/Toast/Toast'

export default function ControllBar({ onBetChange, potentialProfit, spinRoulette, resetTrigger, totalBet, currentBets, setBetTypeChangeHandler, onUndoBet }) {
	const { isChatOpen, setIsChatOpen } = useChat()
	const [activeButton, setActiveButton] = useState('manual')
	const [betAmount, setBetAmount] = useState(0)
	const [inputValue, setInputValue] = useState('0.00')
	const [winAction, setWinAction] = useState('reset')
	const [lossAction, setLossAction] = useState('increase')

	const chips = [
		{ amount: 1, src: '/icons/roulette/chip1.svg' },
		{ amount: 2, src: '/icons/roulette/chip2.svg' },
		{ amount: 5, src: '/icons/roulette/chip5.svg' },
		{ amount: 10, src: '/icons/roulette/chip10.svg' },
		{ amount: 15, src: '/icons/roulette/chip15.svg' },
		{ amount: 25, src: '/icons/roulette/chip25.svg' },
		{ amount: 50, src: '/icons/roulette/chip50.svg' },
		{ amount: 100, src: '/icons/roulette/chip100.svg' },
	]

	const handleAmountChange = (amount) => {
		console.log('Selected chip amount:', amount)
		setBetAmount(amount)
		setInputValue(amount.toFixed(2))
	}

	const handleInputChange = (e) => {
		const value = e.target.value
		if (/^\d*\.?\d{0,2}$/.test(value)) {
			const numericValue = parseFloat(value) || 0
			console.log('Input amount:', numericValue)
			setInputValue(value)
			setBetAmount(numericValue)
		}
	}

	// Reset local state when resetTrigger changes
	useEffect(() => {
		console.log('Reset triggered:', resetTrigger)
		setBetAmount(0)
		setInputValue('0.00')
	}, [resetTrigger])

	// Set handleBetTypeChange in parent
	useEffect(() => {
		setBetTypeChangeHandler(() => handleBetTypeChange)
	}, [setBetTypeChangeHandler, betAmount])

	const handleHalfBet = () => {
		const newBet = betAmount / 2
		console.log('Half bet:', newBet)
		setBetAmount(newBet)
		setInputValue(newBet.toFixed(2))
	}

	const handleDoubleBet = () => {
		const newBet = betAmount * 2
		console.log('Double bet:', newBet)
		setBetAmount(newBet)
		setInputValue(newBet.toFixed(2))
	}

	const handleRemoveBet = () => {
		console.log('Clearing bets')
		setBetAmount(0)
		setInputValue('0.00')
		onBetChange({ chips: 0 })
	}

	// Handle bet type/value from RouletteField
	const handleBetTypeChange = (bet) => {
		console.log('handleBetTypeChange called with:', bet)
		console.log('Current betAmount:', betAmount)
		if (betAmount <= 0) {
			toast({
				title: `Please select a chip amount before placing a bet!`,
				description: ``,
				type: 'fail',
			})
			return
		}
		const newBet = { chips: betAmount, type: bet.type, value: bet.value }
		console.log('Placing bet:', newBet)
		onBetChange(newBet)
	}

	return (
		<div className={` w-full ${!isChatOpen ? 'max-w-[400px]' : ''}`}>
			<div className="w-full rounded-[5px] bg-primary drop-shadow-custom-black">
				<div className="relative w-full p-[2px] h-[42px] flex justify-between align-middle items-center text-lg font-light">
					<div
						className={`absolute top-2px left-[2px] h-full rounded-[5px] bg-bageColor transition-all duration-300 ease-in-out`}
						style={{
							width: '50%',
							height: '38px',
							transform: activeButton === 'manual' ? 'translateX(0)' : 'translateX(calc(100% - 4px))',
						}}
					/>
					<button
						className={`relative z-10 w-full h-[38px] rounded-[5px] ${activeButton === 'manual' ? 'text-mainwhite' : 'text-checkboxColor'
							}`}
						onClick={() => setActiveButton('manual')}
					>
						Manual
					</button>
					<button
						className={`relative z-10 w-full h-[38px] rounded-[5px] ${activeButton === 'auto' ? 'text-mainwhite' : 'text-checkboxColor'
							}`}
						onClick={() => setActiveButton('auto')}
					>
						Auto
					</button>
				</div>
			</div>

			<div className="mt-5">
				<div className="flex justify-between pl-[5px]">
					<p className="text-sm text-mainwhite font-light leading-[17px]">Game Amount</p>
					<p className="text-sm font-light text-checkboxColor leading-[17px]">{inputValue} USD</p>
				</div>
				<div className="relative mt-2 drop-shadow-custom-black">
					<input
						type="text"
						className="w-full h-[37px] pl-[36px] font-light bg-primary rounded-[5px] outline-none no-spinner"
						value={inputValue}
						onChange={handleInputChange}
					/>
					<Image
						className="absolute top-[50%] left-[15px] transform -translate-y-[50%]"
						src="/icons/LTC.svg"
						width={15}
						height={15}
						alt=""
					/>
				</div>
				<div className={styles.chips}>
					{chips.map(({ amount, src }) => (
						<div
							key={amount}
							className={styles.chip}
							onClick={() => handleAmountChange(amount)}
							aria-label={`Select ${amount} chip`}
						>
							<Image src={src} width={25} height={25} alt={`${amount} chip`} />
						</div>
					))}
				</div>
				<div className="flex gap-[1px] mt-5 h-[37px] text-sm font-extralight drop-shadow-custom-black">
					<button className="max-w-[18.5%] min-w-[37px] w-full rounded-l-md px-2 bg-bageColor" onClick={handleHalfBet}>
						1/2
					</button>
					<button className="max-w-[18.5%] min-w-[37px] w-full px-2 bg-bageColor" onClick={handleDoubleBet}>
						2x
					</button>
					<button className="flex items-center gap-[10px] max-w-[67%] min-w-[134px] w-full pl-[15px] pr-[5%] rounded-r-md bg-bageColor" onClick={onUndoBet}>
						<p>Redo</p>
						<div className="flex gap-[3px]">
							<Image src="/icons/LTC.svg" className="ml-[5px]" width={15} height={15} alt="" />
							<p className="ml-[3px] text-[#FFFFFF]">8999.56</p>
						</div>
					</button>
				</div>
				<div className="w-full mt-5 border border-bageColor rounded-[5px]">
					<div className="flex">
						<div className="max-w-[136px] w-full flex flex-col gap-[5px] py-[15px] pl-[15px] pr-[10px] border-r border-bageColor">
							<div className="flex gap-[5px]">
								<Image className="" src="/icons/LTC.svg" width={16} height={16} alt="" />
								<p className="text-[#ffff] font-light leading-[19px]">{totalBet.toFixed(2)}</p>
							</div>
							<p className="text-sm text-checkboxColor leading-[17px]">Total played</p>
						</div>
						<div className="max-w-[105px] w-full p-[15px] flex flex-col gap-[5px]">
							<div className="flex gap-[5px]">
								<Image className="" src="/icons/LTC.svg" width={16} height={16} alt="" />
								<p className="text-[#ffff] font-light leading-[19px]" aria-live="polite">
									{potentialProfit.toFixed(2)}
								</p>
							</div>
							<p className="text-sm text-checkboxColor leading-[17px]">Profit</p>
						</div>
					</div>
				</div>
				{activeButton === 'auto' && (
					<div className="auto mt-5 flex flex-col gap-2 drop-shadow-custom-black">
						<div className="text-sm">
							<label htmlFor="" className="ml-[5px] font-light">
								Number of Bets
							</label>
							<div className="relative">
								<input
									type="number"
									className="w-full mt-2 h-[37px] px-[10px] bg-primary rounded-[5px] placeholder-mainwhite font-light"
									placeholder='0'
								/>
								<Image src='/icons/infinity-ico.svg' className='absolute top-[60%] right-[10px] transform -translate-y-[50%]' width={19} height={8} alt='' />
							</div>
						</div>
						<div className="">
							<div className="w-full pl-[5px] flex justify-between text-sm font-light">
								<label htmlFor="" className="font-light">
									On Win
								</label>
								<p className="text-checkboxColor">0.00 USD</p>
							</div>
							<div className="flex justify-between gap-2 items-center p-[2px] h-[37px] mt-2 text-sm font-light bg-primary rounded-[5px] drop-shadow-custom-black">
								<div className="flex">
									<button
										className={`h-[33px] px-[10px] rounded-[5px] ${winAction === 'reset' ? 'bg-bageColor text-mainwhite' : 'bg-primary text-checkboxColor'}`}
										onClick={() => setWinAction('reset')}
									>
										Reset
									</button>
									<button
										className={`max-w-[101px] w-full h-[33px] px-[10px] rounded-[5px] ${winAction === 'increase' ? 'bg-bageColor text-mainwhite' : 'bg-primary text-checkboxColor'}`}
										onClick={() => setWinAction('increase')}
									>
										Increase by:
									</button>
								</div>
								<input
									type="number"
									className="max-w-[66px] w-full h-[33px] px-[10px] rounded-[5px] text-mainwhite bg-bageColor placeholder-checkboxColor"
									placeholder="0 %"
								/>
							</div>
						</div>
						<div className="">
							<div className="w-full pl-[5px] flex justify-between text-sm font-light">
								<label htmlFor="" className="font-light">
									On Loss
								</label>
								<p className="text-checkboxColor">0.00 USD</p>
							</div>
							<div className="flex justify-between gap-2 items-center p-[2px] h-[37px] mt-2 text-sm font-light bg-primary rounded-[5px] drop-shadow-custom-black">
								<div className="flex">
									<button
										className={`h-[33px] px-[10px] rounded-[5px] ${lossAction === 'reset' ? 'bg-bageColor text-mainwhite' : 'bg-primary text-checkboxColor'}`}
										onClick={() => setLossAction('reset')}
									>
										Reset
									</button>
									<button
										className={`max-w-[101px] w-full h-[33px] px-[10px] rounded-[5px] ${lossAction === 'increase' ? 'bg-bageColor text-mainwhite' : 'bg-primary text-checkboxColor'}`}
										onClick={() => setLossAction('increase')}
									>
										Increase by:
									</button>
								</div>
								<input
									type="number"
									className="max-w-[66px] w-full h-[33px] px-[10px] flex justify-center rounded-[5px] text-mainwhite bg-bageColor placeholder-checkboxColor"
									placeholder="0 %"
								/>
							</div>
						</div>
					</div>
				)}
				<div className="flex justify-between h-[37px] mt-5">
					<button onClick={spinRoulette} className="max-w-[165px] w-full bg-secondary rounded-[5px]">
						Start game
					</button>
					<button onClick={handleRemoveBet} className="max-w-20 w-full bg-placeholder rounded-[5px]">
						Clear
					</button>
				</div>
			</div>
		</div>
	)
}