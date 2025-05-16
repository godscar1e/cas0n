'use client'

import toast from '@/app/components/Toast/Toast'
import BetComponent from './BetComp'
import BetOptions from './BetOptions'
import SpinCircle from './SpinCircle'
import TimerComponent from './Timer'
import { useProfile } from '@/app/hooks/useProfile'
import { useState } from 'react'
import { numbers } from '@/app/utils/roulette/numbers'

export default function Double() {
	const { data: userData, isLoading } = useProfile()
	const [betAmount, setBetAmount] = useState<number>(0)
	const [betValue, setBetValue] = useState<string>('')
	const [isSpinning, setIsSpinning] = useState<boolean>(false)
	const [targetNumber, setTargetNumber] = useState<number | null>(null)

	const colorMap: Record<string, string> = {
		pink: 'red',
		secondary: 'black',
		yellow: 'green',
		purple: 'black'
	}

	const handleBet = async () => {
		if (!userData) {
			toast({
				title: `You are not logged in!`,
				description: ``,
				type: 'fail'
			})
			// toast.error('You are not logged in!', { description: '' })
			return
		}

		if (betAmount <= 0) {
			toast({
				title: `Invalid bet amount`,
				description: 'Please enter a valid bet amount.',
				type: 'fail'
			})
			// toast.error('Invalid bet amount', { description: 'Please enter a valid bet amount.' })
			return
		}

		if (!betValue) {
			toast({
				title: `No bet option selected`,
				description: 'Please select a bet option.',
				type: 'fail'
			})
			// toast.error('No bet option selected', { description: 'Please select a bet option.' })
			return
		}

		try {
			const response = await fetch('http://localhost:4200/api/double/bet', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					gameId: "1",
					userId: userData.user.id,
					betAmount,
					betValue,
				})
			})

			if (!response.ok) {
				const errorData = await response.json()
				if (errorData.message === 'Insufficient balance') {
					toast({
						title: `Insufficient balance`,
						description: 'You do not have enough funds to place this bet.',
						type: 'fail'
					}) 
					// toast.error('Insufficient balance', {
					// 	description: 'You do not have enough funds to place this bet.'
					// })
					return
				}
				throw new Error(errorData.message || 'Failed to place bet')
			}
			toast({
				title: `Bet placed successfully!`,
				description: `You bet ${betAmount} on ${betValue}.`,
				type: 'success'
			})
			// toast.success('Bet placed successfully!', {
			// 	description: `You bet ${betAmount} on ${betValue}.`
			// })

			setBetAmount(0)
			setBetValue('')
		} catch (error: any) {
			// toast({
			// 	title: `Bet placed successfully!`,
			// 	description: `You bet ${betAmount} on ${betValue}.`,
			// 	type: 'fail'
			// })
			// toast.error('Error placing bet', { description: error.message })
		}
	}

	const handleTimerEnd = async () => {
		console.log('handleTimerEnd triggered')
		if (isSpinning) {
			console.log('Spin in progress, skipping timer end')
			return
		}

		try {
			console.log('Fetching random number...')
			const res = await fetch('/api/random-number', { method: 'POST' })
			if (res.ok) {
				const data = await res.json()
				const number = Math.min(Math.max(data.number, 0), numbers.length - 1) // Clamp number
				console.log(`Random number received: ${number}`)
				setTargetNumber(number)
				setIsSpinning(true)
			} else {
				const errorData = await res.json()
	
				// toast.error('Error', { description: errorData.message || 'Request failed' })
			}
		} catch (error: any) {
			// toast.error('Error', { description: error.message || 'Failed to process roulette spin' })
		}
	}

	const handleSpinEnd = () => {
		console.log('Spin ended')
		setIsSpinning(false)
		setTargetNumber(null)
	}

	return (
		<div className='max-w-[1130px]'>
			<SpinCircle isSpinning={isSpinning} targetNumber={targetNumber} onSpinEnd={handleSpinEnd} />
			<TimerComponent onTimerEnd={handleTimerEnd} isSpinning={isSpinning} />
			<BetComponent betAmount={betAmount} setBetAmount={setBetAmount} />
			<BetOptions setBetValue={setBetValue} handleBet={handleBet} />
		</div>
	)
}