'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { numbers } from '@/app/utils/roulette/numbers'
import { useProfile } from '@/app/hooks/useProfile'
import { useBalance } from '@/app/hooks/useBalance'
import { useChat } from '@/app/context/ChatContext'
import rouletteSpinService from '@/app/services/roulettespin.sevice'
import rouletteNumberService from '@/app/services/roulettespin-number'
import ControllBar from './ControllBar'
import RouletteField from './RouletteField'
import { calculatePayout } from '@/app/utils/roulette/payout'
import toast from '@/app/components/Toast/Toast'
import PrevSpins from './ControllBar/PrevSpins'
import RouletteWheel from './RouletteWheel'

export default function Roulette() {
	const { isChatOpen, setIsChatOpen } = useChat()
	const { balance, isBalanceLoading } = useBalance()
	const [spinResult, setSpinResult] = useState(null)
	const { data: userData, isLoading } = useProfile()
	const [currentBets, setCurrentBets] = useState([])
	const [potentialProfit, setPotentialProfit] = useState(0)
	const [resetTrigger, setResetTrigger] = useState(0)
	const [betTypeChangeHandler, setBetTypeChangeHandler] = useState(null)
	const [isSpinning, setIsSpinning] = useState(false)

	const handleBetChange = useCallback((bet) => {
		console.log('handleBetChange called with:', bet)
		setCurrentBets(prevBets => {
			if (bet.chips > 0 && bet.type && bet.value !== undefined && bet.value !== null) {
				const newBet = { chips: Number(bet.chips), type: bet.type, value: bet.value }
				console.log('Adding bet:', { newBet, currentBets: [...prevBets, newBet] })
				return [...prevBets, newBet]
			}
			if (bet.chips === 0) {
				console.log('Clearing bets')
				return []
			}
			console.log('Invalid bet, no change:', bet)
			return prevBets
		})
	}, [])

	const resetBet = useCallback(() => {
		console.log('Resetting bets')
		setCurrentBets([])
		setPotentialProfit(0)
		setResetTrigger(prev => prev + 1)
	}, [])

	const handleUndoBet = useCallback(() => {
		setCurrentBets(prevBets => {
			if (prevBets.length === 0) {
				console.log('No bets to undo')
				return prevBets
			}
			const updatedBets = prevBets.slice(0, -1) // Удаляем последнюю ставку
			console.log('Undo last bet, new currentBets:', updatedBets)
			return updatedBets
		})
	}, [])

	useEffect(() => {
		console.log('Calculating potentialProfit:', { currentBets })
		const totalProfit = currentBets.reduce((sum, bet) => {
			if (bet.type && bet.value !== undefined && bet.chips) {
				const payoutMultiplier = calculatePayout(bet.type, bet.value, undefined, Number(bet.chips))
				return sum + payoutMultiplier * Number(bet.chips)
			}
			return sum
		}, 0)
		setPotentialProfit(totalProfit)
	}, [currentBets])

	if (isLoading) {
		// return <div>Loading...</div>
	}

	const handleSpinEnd = async (winningNumber) => {
		setSpinResult(winningNumber)
		console.log('Spin result:', winningNumber)

		// Process each bet individually
		for (const bet of currentBets) {
			const payout = calculatePayout(bet.type, bet.value, winningNumber, Number(bet.chips))
			const wonFunds = payout * Number(bet.chips)
			const isWin = wonFunds > 0

			// Show toast for each bet
			if (isWin) {
				toast({
					title: `You won ${wonFunds}$ on ${bet.type} (${bet.value})!`,
					description: ``,
					type: 'success'
				})
			} else {
				toast({
					title: `You lost on ${bet.type} (${bet.value})`,
					description: '',
					type: 'fail'
				})
			}

			// Record each bet in the database
			await rouletteSpinService.createSpin({
				userId: userData.user.id,
				username: userData.user.username,
				betAmount: Number(bet.chips),
				isWin,
				amountOfWin: isWin ? wonFunds : 0,
			})
		}

		// Record the spin number once
		await rouletteNumberService.createSpinNumber({ number: winningNumber })
		resetBet()
		setIsSpinning(false)
	}

	const spinRoulette = async () => {
		if (isSpinning) {
			toast({
				title: `Please wait for the current spin to finish!`,
				description: ``,
				type: 'fail'
			})
			return
		}

		console.log('spinRoulette called, currentBets:', currentBets)
		if (!userData) {
			toast({
				title: `You are not logged in!`,
				description: ``,
				type: 'fail'
			})
			return
		}

		if (currentBets.length === 0) {
			toast({
				title: `Please place at least one bet before spinning the wheel!`,
				description: ``,
				type: 'fail'
			})
			return
		}

		const totalBetAmount = currentBets.reduce((sum, bet) => sum + Number(bet.chips), 0)
		console.log('Total bet amount:', totalBetAmount)
		if (isNaN(totalBetAmount) || totalBetAmount <= 0) {
			toast({
				title: `Invalid bet amount!`,
				description: ``,
				type: 'fail'
			})
			return
		}

		if (isBalanceLoading) {
			toast({
				title: `Please wait while the balance is loaded.`,
				description: ``,
				type: 'fail'
			})
			return
		}

		if (balance < totalBetAmount) {
			toast({
				title: `Insufficient funds on balance!`,
				description: ``,
				type: 'fail'
			})
			return
		}

		try {
			const res = await fetch('/api/random-number', { method: 'POST' })
			if (res.ok) {
				// Запускаем вращение колеса
				setIsSpinning(true)
			} else {
				const errorData = await res.json()
				console.error('Ошибка при запросе числа для рулетки:', errorData)
				toast({
					title: 'Ошибка',
					description: errorData.message || 'Request failed',
					type: 'fail'
				})
			}
		} catch (error) {
			console.error('Ошибка при обработке спина рулетки:', error)
			toast({
				title: 'Ошибка',
				description: error.response?.data?.message || error.message,
				type: 'fail'
			})
		}
	}

	const handleClearBet = () => {
		handleBetChange({ chips: 0 })
	}

	const spinNumberData = numbers.find(n => n.number === spinResult)

	const colorMap = {
		red: 'bg-[#FE2247]',
		black: 'bg-bageColor',
		green: 'bg-secondary',
	}

	const spinColorClass = spinResult === 0
		? 'bg-secondary'
		: spinNumberData
			? colorMap[spinNumberData.color]
			: 'bg-transparent'

	const borderClass = spinResult !== null ? '' : 'border border-placeholder'

	return (
		<div className={`max-w-[1210px] w-full ${!isChatOpen ? 'max-w-[1436px]' : ''}`}>
			<div className="pr-5 max-[1580px]:px-5 max-[1580px]:pb-5">
				<div className="flex justify-between">
					<div className="w-full flex gap-5 flex-wrap-reverse">
						<div className="max-w-[350px] w-full min-[1580px]:px-10 min-[1580px]:pt-[60px] border-r border-bageColor max-[1580px]:max-w-none  max-[1580px]:border-none">
							<ControllBar
								onBetChange={handleBetChange}
								spinRoulette={spinRoulette}
								potentialProfit={potentialProfit}
								resetTrigger={resetTrigger}
								totalBet={currentBets.reduce((sum, bet) => sum + Number(bet.chips), 0)}
								currentBets={currentBets}
								setBetTypeChangeHandler={setBetTypeChangeHandler}
								onUndoBet={handleUndoBet}
							/>
						</div>

						<div className="max-w-[779px] w-full flex flex-col gap-10 mx-auto pt-10 pb-5 min-[1580px]:px-5">
							<div className="max-w-[552px] w-full flex justify-between items-center mx-auto ">
								<div
									className={`w-[60px] h-[60px] flex justify-center items-center rounded-[5px] ${spinColorClass} ${borderClass}`}
								>
									{spinResult !== null && (
										<p className="">
											{spinResult}
										</p>
									)}
								</div>
								<RouletteWheel startSpin={isSpinning} onSpinEnd={handleSpinEnd} />
								<PrevSpins isChatOpen={isChatOpen} />
							</div>
							<div className="max-w-[739px] w-full mx-auto">
								<RouletteField
									onBetTypeChange={betTypeChangeHandler}
									currentBets={currentBets}
								/>
							</div>
							<div className="flex justify-between mt-[-10px] font-light leading-[17px]">
								<button className='flex gap-[5px]' onClick={handleUndoBet}>
									<p className='text-sm'>Undo</p>
									<Image src='/icons/undo-ico.svg' width={15} height={17} alt='' />
								</button>
								<button className='flex gap-[10px]'>
									<p className='text-sm text-checkboxColor underline'>Provably Fair</p>
									<Image src='/icons/fair-ico.svg' width={17} height={17} alt='' />
								</button>
								<button className='flex gap-[5px]' onClick={handleClearBet}>
									<p className='text-sm'>Clear</p>
									<Image src='/icons/clear-ico.svg' width={17} height={15} alt='' />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}