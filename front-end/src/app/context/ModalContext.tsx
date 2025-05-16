'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ModalContextType {
	modalCount: number
	modalContent: ReactNode | null
	openModal: (content: ReactNode) => void
	closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
	const [modalCount, setModalCount] = useState(0)
	const [modalContent, setModalContent] = useState<ReactNode | null>(null)

	const openModal = (content: ReactNode) => {
		console.log('Opening modal with content:', content)
		setModalContent(content)
		setModalCount((prev) => prev + 1)
	}

	const closeModal = () => {
		console.log('Closing modal, current modalCount:', modalCount)
		setModalCount((prev) => Math.max(prev - 1, 0))
		if (modalCount <= 1) {
			setModalContent(null)
		}
	}

	return (
		<ModalContext.Provider value={{ modalCount, modalContent, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	)
}

export function useModal() {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider')
	}
	return context
}