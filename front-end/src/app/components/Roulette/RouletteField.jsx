import React, { useState } from 'react'
import { numbers } from '@/app/utils/roulette/numbers'
import styles from './Roulette.module.scss'
import ToggleButton from '@/app/components/ui/ToggleButton'

export default function RouletteField({ onBetTypeChange, currentBets = [] }) {
	const [betType, setBetType] = useState({ type: '', value: '' })
	const [isBlackHovered, setIsBlackHovered] = useState(false)
	const [isRedHovered, setIsRedHovered] = useState(false)
	const [isRow1Hovered, setIsRow1Hovered] = useState(false)
	const [isRow2Hovered, setIsRow2Hovered] = useState(false)
	const [isRow3Hovered, setIsRow3Hovered] = useState(false)
	const [isOddHovered, setIsOddHovered] = useState(false)
	const [isEvenHovered, setIsEvenHovered] = useState(false)
	const [is1to12Hovered, setIs1to12Hovered] = useState(false)
	const [is13to24Hovered, setIs13to24Hovered] = useState(false)
	const [is25to36Hovered, setIs25to36Hovered] = useState(false)
	const [isLowHovered, setIsLowHovered] = useState(false)
	const [isHighHovered, setIsHighHovered] = useState(false)

	const handleChange = (type, value) => {
		const newBetType = { type, value }
		console.log('RouletteField bet:', newBetType)
		setBetType(newBetType)
		onBetTypeChange(newBetType)
	}

	const gridNumbers = Array(3).fill().map((_, rowIndex) =>
		Array(12).fill().map((_, colIndex) => {
			const num = rowIndex + 1 + colIndex * 3
			return numbers.find(n => n.number === num) || null
		})
	).flat()

	const zero = { number: 0, color: 'green', isEven: true }

	const shouldDimButtons =
		isBlackHovered ||
		isRedHovered ||
		isRow1Hovered ||
		isRow2Hovered ||
		isRow3Hovered ||
		isOddHovered ||
		isEvenHovered ||
		is1to12Hovered ||
		is13to24Hovered ||
		is25to36Hovered ||
		isLowHovered ||
		isHighHovered

	const shouldDimNumber = (num) => {
		const isEven = num.number % 2 === 0
		const columns = [[], [], []]
		numbers.forEach((n, index) => {
			const columnIndex = index % 3
			columns[columnIndex].push(n)
		})
		if (isBlackHovered && num.color !== 'black') return true
		if (isRedHovered && num.color !== 'red') return true
		if (isRow1Hovered && !columns[0].some((n) => n.number === num.number)) return true
		if (isRow2Hovered && !columns[1].some((n) => n.number === num.number)) return true
		if (isRow3Hovered && !columns[2].some((n) => n.number === num.number)) return true
		if (isOddHovered && (isEven || num.number === 0)) return true
		if (isEvenHovered && (!isEven || num.number === 0)) return true
		if (is1to12Hovered && (num.number < 1 || num.number > 12)) return true
		if (is13to24Hovered && (num.number < 13 || num.number > 24)) return true
		if (is25to36Hovered && (num.number < 25 || num.number > 36)) return true
		if (isLowHovered && (num.number < 1 || num.number > 18)) return true
		if (isHighHovered && (num.number < 19 || num.number > 36)) return true
		return false
	}

	const hasBet = (type, value) => {
		return currentBets.some(bet => bet.type === type && bet.value === value)
	}

	return (
		<div className={styles.rouletteField}>
			<div className={styles.rouletteTable}>
				<div className="flex max-w-[830px] min-w-[539px] w-full">
					<div className={styles.numberSection}>
						{/* Zero spanning first 3 columns and first 3 rows */}
						<div
							className={`${styles.number} ${styles.numberGreen} flex justify-center items-center w-full rounded-[6px] text-[clamp(12px,2.5vw,20px)] ${shouldDimNumber(zero) ? styles.dimmed : ''} ${hasBet('number', zero.number) ? styles.betPlaced : ''}`}
							style={{ gridArea: 'zero' }}
							onClick={() => handleChange('number', zero.number)}
						>
							{zero.number}
						</div>
						{/* Numbers 1-36 in a 3x12 grid */}
						{gridNumbers.map((num, index) => (
							num && (
								<div
									key={index}
									className={`${styles.number} flex justify-center items-center w-full max-w-[47px] rounded-[6px] text-[clamp(12px,2.5vw,20px)] ${shouldDimNumber(num)
										? styles.dimmed
										: styles[`number${num.color.charAt(0).toUpperCase() + num.color.slice(1)}`]
										} ${num.number % 2 === 0 ? styles.even : styles.odd} ${hasBet('number', num.number) ? styles.betPlaced : ''}`}
									style={{ gridArea: `num${num.number}` }}
									onClick={() => handleChange('number', num.number)}
								>
									{num.number}
								</div>
							)
						))}
						{/* 2:1 buttons in the 16th column, aligned with each row */}
						<button
							className={`w-full h-full rounded-[6px] bg-transparent border border-placeholder transition-all duration-400 ease-in-out ${shouldDimButtons && !isRow1Hovered ? styles.dimmed : ''} ${hasBet('row', 'row1') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'row1', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('row', 'row1')}
							onMouseEnter={() => setIsRow1Hovered(true)}
							onMouseLeave={() => setIsRow1Hovered(false)}
						>
							2:1
						</button>
						<button
							className={`w-full h-full rounded-[6px] bg-transparent border border-placeholder transition-all duration-400 ease-in-out ${shouldDimButtons && !isRow2Hovered ? styles.dimmed : ''} ${hasBet('row', 'row2') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'row2', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('row', 'row2')}
							onMouseEnter={() => setIsRow2Hovered(true)}
							onMouseLeave={() => setIsRow2Hovered(false)}
						>
							2:1
						</button>
						<button
							className={`w-full h-full rounded-[6px] bg-transparent border border-placeholder transition-all duration-400 ease-in-out ${shouldDimButtons && !isRow3Hovered ? styles.dimmed : ''} ${hasBet('row', 'row3') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'row3', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('row', 'row3')}
							onMouseEnter={() => setIsRow3Hovered(true)}
							onMouseLeave={() => setIsRow3Hovered(false)}
						>
							2:1
						</button>
						{/* Range buttons from bottomSection (Row 4) */}
						<button
							className={`w-full rounded-[10px] border border-[#5B7281] transition-all duration-400 ease-in-out ${styles.range} ${shouldDimButtons && !is1to12Hovered ? styles.dimmed : ''} ${hasBet('range', '1to12') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'range1to12', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('range', '1to12')}
							onMouseEnter={() => setIs1to12Hovered(true)}
							onMouseLeave={() => setIs1to12Hovered(false)}
						>
							1 to 12
						</button>
						<button
							className={`w-full rounded-[10px] border border-[#5B7281] transition-all duration-400 ease-in-out ${styles.range} ${shouldDimButtons && !is13to24Hovered ? styles.dimmed : ''} ${hasBet('range', '13to24') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'range13to24', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('range', '13to24')}
							onMouseEnter={() => setIs13to24Hovered(true)}
							onMouseLeave={() => setIs13to24Hovered(false)}
						>
							13 to 24
						</button>
						<button
							className={`w-full rounded-[10px] border border-[#5B7281] transition-all duration-400 ease-in-out ${styles.range} ${shouldDimButtons && !is25to36Hovered ? styles.dimmed : ''} ${hasBet('range', '25to36') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'range25to36', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('range', '25to36')}
							onMouseEnter={() => setIs25to36Hovered(true)}
							onMouseLeave={() => setIs25to36Hovered(false)}
						>
							25 to 36
						</button>
						{/* Other buttons from bottomSection (Row 5) */}
						<button
							className={`${styles.area} ${styles.low} rounded-[10px] transition-all duration-400 ease-in-out ${shouldDimButtons && !isLowHovered ? styles.dimmed : ''} ${hasBet('range', 'low') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'low', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('range', 'low')}
							onMouseEnter={() => setIsLowHovered(true)}
							onMouseLeave={() => setIsLowHovered(false)}
						>
							1 to 18
						</button>
						<button
							className={`${styles.area} ${styles.even} rounded-[10px] transition-all duration-400 ease-in-out ${shouldDimButtons && !isEvenHovered ? styles.dimmed : ''} ${hasBet('even', 'even') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'even', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('even', 'even')}
							onMouseEnter={() => setIsEvenHovered(true)}
							onMouseLeave={() => setIsEvenHovered(false)}
						>
							Even
						</button>
						<button
							className={`${styles.area} ${styles.red} rounded-[10px] border-none transition-all duration-400 ease-in-out ${shouldDimButtons && !isRedHovered ? styles.dimmed : ''} ${hasBet('color', 'red') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'red', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('color', 'red')}
							onMouseEnter={() => setIsRedHovered(true)}
							onMouseLeave={() => setIsRedHovered(false)}
						>
							Red
						</button>
						<button
							className={`${styles.area} ${styles.black} rounded-[10px] border-none transition-all duration-400 ease-in-out ${shouldDimButtons && !isBlackHovered ? styles.dimmed : ''} ${hasBet('color', 'black') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'black', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('color', 'black')}
							onMouseEnter={() => setIsBlackHovered(true)}
							onMouseLeave={() => setIsBlackHovered(false)}
						>
							Black
						</button>
						<button
							className={`${styles.area} ${styles.odd} rounded-[10px] transition-all duration-400 ease-in-out ${shouldDimButtons && !isOddHovered ? styles.dimmed : ''} ${hasBet('odd', 'odd') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'odd', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('odd', 'odd')}
							onMouseEnter={() => setIsOddHovered(true)}
							onMouseLeave={() => setIsOddHovered(false)}
						>
							Odd
						</button>
						<button
							className={`${styles.area} ${styles.high} rounded-[10px] transition-all duration-400 ease-in-out ${shouldDimButtons && !isHighHovered ? styles.dimmed : ''} ${hasBet('range', 'high') ? styles.betPlaced : ''}`}
							style={{ gridArea: 'high', willChange: 'filter, box-shadow' }}
							onClick={() => handleChange('range', 'high')}
							onMouseEnter={() => setIsHighHovered(true)}
							onMouseLeave={() => setIsHighHovered(false)}
						>
							19 to 36
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}