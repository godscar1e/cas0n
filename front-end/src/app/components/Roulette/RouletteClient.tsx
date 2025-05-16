'use client'

import Roulette from '@/app/components/Roulette/Roulette'
import { useChat } from '@/app/context/ChatContext'

export default function RouletteClient() {
	const { isChatOpen, setIsChatOpen } = useChat()
	return (
		<div className={`relative max-w-[1250px] w-full mt-5 mx-auto px-5`}>
			<div className={`relative flex self-center justify-center max-w-[1210px] mb-5 w-full rounded-[15px] border border-bageColor m-auto bg-secondBlue`}>
				<Roulette />
			</div>
		</div>
	)
}
