import { numbers } from '@/app/utils/roulette/numbers'

export const calculatePayout = (betType, betValue, spinNumber, betAmount) => {
	console.log("calculatePayout вызван с:", betType, betValue, spinNumber, betAmount)

	// Return 0 if required parameters are missing (except spinNumber, which can be undefined for potential payout)
	if (!betType || betValue === undefined || betValue === null || betAmount === undefined) {
		console.warn("Invalid parameters for calculatePayout:", { betType, betValue, spinNumber, betAmount })
		return 0
	}

	// If spinNumber is provided, calculate actual payout
	if (spinNumber !== undefined) {
		const resultNumber = numbers.find(num => num.number === spinNumber)
		if (!resultNumber) {
			console.warn("No result number found for spinNumber:", spinNumber)
			return 0
		}

		switch (betType) {
			case 'number':
				return betValue === spinNumber ? 36 : 0

			case 'color':
				return resultNumber.color === betValue ? 2 : 0

			case 'even':
				return resultNumber.isEven ? 2 : 0

			case 'odd':
				return !resultNumber.isEven ? 2 : 0

			case 'range':
				if (betValue === 'high') {
					return spinNumber >= 19 ? 2 : 0
				}
				if (betValue === 'low') {
					return spinNumber <= 18 ? 2 : 0
				}
				if (betValue === '1to12') {
					return spinNumber >= 1 && spinNumber <= 12 ? 3 : 0
				}
				if (betValue === '13to24') {
					return spinNumber >= 13 && spinNumber <= 24 ? 3 : 0
				}
				if (betValue === '25to36') {
					return spinNumber >= 25 && spinNumber <= 36 ? 3 : 0
				}
				return 0

			case 'green':
				return spinNumber === 0 ? 36 : 0

			case 'row':
				if (betValue === 'row1' && [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].includes(spinNumber)) {
					return 3
				}
				if (betValue === 'row2' && [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(spinNumber)) {
					return 3
				}
				if (betValue === 'row3' && [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(spinNumber)) {
					return 3
				}
				return 0

			default:
				console.warn("Unknown bet type:", betType)
				return 0
		}
	}

	// If spinNumber is undefined, return potential payout multiplier (assuming bet wins)
	switch (betType) {
		case 'number':
			return 36 // Payout for single number bet
		case 'color':
			return 2 // Payout for color bet
		case 'even':
			return 2 // Payout for even bet
		case 'odd':
			return 2 // Payout for odd bet
		case 'range':
			if (['high', 'low'].includes(betValue)) {
				return 2 // Payout for high/low
			}
			if (['1to12', '13to24', '25to36'].includes(betValue)) {
				return 3 // Payout for dozens
			}
			return 0
		case 'green':
			return 36 // Payout for green (0)
		case 'row':
			return 3 // Payout for row bets
		default:
			console.warn("Unknown bet type for potential payout:", betType)
			return 0
	}
}