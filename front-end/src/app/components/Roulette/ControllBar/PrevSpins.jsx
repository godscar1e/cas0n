'use client'

import { numbers } from '@/app/utils/roulette/numbers'

import { usePrevSpins } from '@/app/hooks/usePrevSpins'
import contrBarStyles from '../ControllBar.module.scss'

export default function PreviousSpins({ isChatOpen }) {
	const { data: prevSpins } = usePrevSpins()

	const previousSpins = prevSpins || []


	function getColorClass(color, number) {
		if (number === 0) {
			return 'numberGreen'
		}
		switch (color) {
			case 'red':
				return 'numberRed'
			case 'black':
				return 'numberBlack'
			case 'green':
				return 'numberGreen'
			default:
				return ''
		}
	}

	return (
		<div className={contrBarStyles.previousBets}>
			<h3 className="text-lg text-placeholder">PB</h3>
			<ul className="flex flex-col gap-[5px]">
				{ previousSpins.slice(0, 6).map((bet, index) => {
					const betValue = bet.number // Извлекаем число
					const betInfo = numbers.find((num) => num.number === betValue)
					const colorClass = getColorClass(betInfo?.color || '', betValue)

					return (
						<li key={`${betValue}-${index}`} className={contrBarStyles[colorClass] || ''}>
							{betValue} {/* Выводим число, а не объект */}
						</li>
					)
				})}
			</ul>

		</div>
	)
}
