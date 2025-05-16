'use client'

import Image from 'next/image'

interface BetOptionsProps {
	setBetValue: (value: string) => void
	handleBet: () => void
}

export default function BetOptions({ setBetValue, handleBet }: BetOptionsProps) {
	const handleBetClick = (color: string) => {
		setBetValue(color)
		handleBet()
	}

	return (
		<div className="flex gap-[22px] mt-10">
			<div className="w-full drop-shadow-[0_4px_0_#741338]">
				<button
					className="w-full h-[46px] bg-pink rounded-[10px] flex items-center justify-between text-white text-sm px-7"
					onClick={() => handleBetClick('pink')}
				>
					<span><Image src='/icons/double/crosshair.svg' width={16} height={16} alt='' /></span>
					<p>Bet</p>
					<span className='text-darkBlue font-medium opacity-40'>x2</span>
				</button>
			</div>
			<div className="w-full drop-shadow-[0_4px_0_#045344]">
				<button
					className="w-full h-[46px] rounded-[10px] bg-secondary flex items-center justify-between text-white text-sm px-7"
					onClick={() => handleBetClick('secondary')}
				>
					<span><Image src='/icons/double/kerambit.svg' width={23} height={18} alt='' /></span>
					<p>Bet</p>
					<span className='text-darkBlue font-medium opacity-40'>x14</span>
				</button>
			</div>
			<div className="w-full drop-shadow-[0_4px_0_#62562C]">
				<button
					className="w-full h-[46px] rounded-[10px] bg-yellow flex items-center justify-between text-white text-sm px-7"
					onClick={() => handleBetClick('yellow')}
				>
					<span><Image src='/icons/double/skull.svg' width={13} height={14.9} alt='' /></span>
					<p>Bet</p>
					<span className='text-darkBlue font-medium opacity-40'>x2</span>
				</button>
			</div>
			<div className="w-full drop-shadow-[0_4px_0_#484586]">
				<button
					className="w-full h-[46px] rounded-[10px] bg-purple flex items-center justify-between text-white text-sm px-7"
					onClick={() => handleBetClick('purple')}
				>
					<span><Image src='/icons/double/knife.svg' width={14.38} height={14.34} alt='' /></span>
					<p>Bet</p>
					<span className='text-darkBlue font-medium opacity-40'>x7</span>
				</button>
			</div>
		</div>
	)
}