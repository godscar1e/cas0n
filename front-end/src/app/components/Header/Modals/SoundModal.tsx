'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import SoundSlider from '../SoundSlider/SoundSlider.jsx'

interface SoundModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function SoundModal({ isOpen, onClose }: SoundModalProps) {
	const soundModalRef = useRef<HTMLDivElement>(null)

	// Обработчик клика вне модалки
	useEffect(() => {
		const handleClickOutsideSoundModal = (event: MouseEvent) => {
			if (
				isOpen &&
				soundModalRef.current &&
				!soundModalRef.current.contains(event.target as Node)
			) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutsideSoundModal)
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideSoundModal)
		}
	}, [isOpen, onClose])

	const soundModalContent = isOpen ? (
		<div
			ref={soundModalRef}
			className="absolute right-0 top-[-10px] w-[135px] h-10 px-[10px] flex justify-between items-center my-auto rounded-[5px] bg-bageColor z-[1000]"
		>
			<Image src="/icons/header/soundminus.svg" width={12} height={20} alt="" />
			<SoundSlider />
			<Image src="/icons/header/soundplus.svg" width={16} height={20} alt="" />
		</div>
	) : null

	return soundModalContent
}