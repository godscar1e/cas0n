'use client'

import { useState, useEffect, useRef } from 'react'

interface TimerComponentProps {
	onTimerEnd: () => void
	isSpinning: boolean
}

export default function TimerComponent({ onTimerEnd, isSpinning }: TimerComponentProps) {
	const [timeLeft, setTimeLeft] = useState(3)
	const calledRef = useRef(false)

	useEffect(() => {
		if (isSpinning) {
			setTimeLeft(3)
			calledRef.current = false
			return
		}

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				const next = prev - 1
				if (next <= 0 && !calledRef.current) {
					calledRef.current = true
					onTimerEnd()
					return 15
				}
				return next
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [isSpinning, onTimerEnd])

	const progress = timeLeft / 15

	return (
		<div className="mt-5">
			<p className="text-lg font-medium text-center">ROLLING IN <span className='text-emerald'>{timeLeft} sec.</span></p>
			<div className="relative mt-[10px] h-1 bg-bageColor text-white rounded-sm">
				<div
					className="bg-emerald h-1 transition-all duration-1000 ease-linear origin-left"
					style={{ transform: `scaleX(${progress})`, width: '100%', position: 'absolute', top: 0, left: 0, borderRadius: 2 }}
				/>
			</div>
		</div>
	)
}
