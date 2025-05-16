'use client'

import Image from 'next/image'
import HeaderClient from './HeaderClient'
import { useChat } from '@/app/context/ChatContext'
import { useState, useEffect } from 'react'

export default function HeaderServer() {
	const { isChatOpen, setIsChatOpen } = useChat()
	const [showButton, setShowButton] = useState(false)
	const [isLoggedInFromClient, setIsLoggedInFromClient] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowButton(true)
		}, 1300)
		return () => clearTimeout(timer)
	}, [])

	const handleLoginStatusChange = (isLoggedIn: boolean) => {
		console.log('Received isLoggedIn from HeaderClient:', isLoggedIn)
		setIsLoggedInFromClient(isLoggedIn)
	}

	return (
		<header
			className="sticky top-0 h-20 bg-primary drop-shadow-custom-black transition-all duration-500 ease-in-out z-10">
			<div className="max-w-[1249px] w-full h-20 px-5 mx-auto flex justify-between items-center gap-5 ">
				{/* <div className="w-full flex gap-5 align-middle items-center"> */}
				<HeaderClient onLoginStatusChange={handleLoginStatusChange} />
				{!isChatOpen && showButton && (
					<div className="pl-[22px] h-7 flex justify-end items-center border-l border-bageColor">
						<button className="" onClick={() => setIsChatOpen(true)}>
							<Image
								className="rotate-180"
								src="/icons/chat_icons/open_close-ico.svg"
								width={27}
								height={16}
								alt=""
							/>
						</button>
					</div>
				)}
				{/* </div> */}
			</div>
		</header>
	)
}