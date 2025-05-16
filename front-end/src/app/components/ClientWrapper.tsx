'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { io, Socket } from 'socket.io-client'
import { ChatProvider } from '../context/ChatContext'
import { LeftBarProvider } from '../context/LeftBarContext'
import { ModalProvider, useModal } from '../context/ModalContext'
import LeftBar from './LeftBar/LeftBar'
import Navbar from './Admin/Navbar'
import Header from './Header/Header'
import { Toaster } from 'sonner'
import SocketComponent from '../services/socket'
import Chat from './Chat/Chat'
import MobileMenuNav from './MobileMenuNav/MobileMenuNav'

export default function ClientWrapper({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const pathname = usePathname()
	const isDashboard = pathname.startsWith('/dashboard')
	const [socket, setSocket] = useState<Socket | null>(null)

	useEffect(() => {
		const newSocket = io('http://localhost:4201')
		setSocket(newSocket)

		newSocket.on('connect', () => {
			console.log('Connected to server')
		})

		newSocket.on('disconnect', () => {
			console.log('Disconnected from server')
		})

		return () => {
			if (newSocket) {
				newSocket.disconnect()
			}
		}
	}, [])

	return (
		<ChatProvider>
			<LeftBarProvider>
				<ModalProvider>
					{!isDashboard && <LeftBar />}
					{isDashboard && <Navbar />}
					{/* <div className="flex flex-col w-full"> */}
					<div className="w-full overflow-x-hidden block">
						<Toaster position="bottom-right" richColors />
						{/* <SocketComponent /> */}
						<main className="main h-[100vh] flex flex-col flex-1 relative overflow-y-scroll transition-all duration-500 ease-in-out z-0">
							<Header />
							{children}
							<MobileMenuNav />
						</main>
					</div>
					{/* </div> */}
					<Chat />
					<Overlay />
				</ModalProvider>
			</LeftBarProvider>
		</ChatProvider>
	)
}

function Overlay() {
	const { modalCount, modalContent, closeModal } = useModal()
	console.log('Overlay: modalCount =', modalCount, 'modalContent =', modalContent)

	return modalCount > 0 ? (
		<div
			id="modal-root"
			className="fixed inset-0 flex items-center justify-center p-5">
			<div
				className="absolute inset-0 bg-[rgba(0,0,0,0.5)] pointer-events-auto"
				onClick={closeModal}
			></div>
			<div className="relative">
				{modalContent || <div className="">Default Modal Content</div>}
			</div>
		</div>
	) : null
}