'use client'

import SliderComp from '@/app/components/HomePage/Slider'
import BattlesHomePageComp from '@/app/components/HomePage/Battles'
import Games from '@/app/components/HomePage/Games'
import GameRoulette from '@/app/components/HomePage/GameRoulette'
import HowWorks from '@/app/components/HomePage/HowWorks'
import { useChat } from '@/app/context/ChatContext'



export default function HomePageComp() {
	const { isChatOpen, setIsChatOpen } = useChat()
	return (
		<div className='w-full'>
			<SliderComp />
			<div className="h-auto px-[60px] pt-10 bg-primary">
				<BattlesHomePageComp />
				<Games />
				<GameRoulette />
				<HowWorks />
			</div>
		</div>
	)
}
