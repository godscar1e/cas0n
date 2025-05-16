'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { Auth } from '../../auth/Auth'
import NotificationsModal from './Modals/NotificationsModal'
import DropdownModal from './Modals/DropdownModal'
import SoundModal from './Modals/SoundModal'
import Link from 'next/link'
import CurrencySelect from './CurrencySelect'
import { selectStyles } from './SelectStyles'
import { CryptoNavigation } from '../Funds/CryptoNavigation'
import { useModal } from '../../context/ModalContext'

interface HeaderClientProps {
	onLoginStatusChange: (isLoggedIn: boolean) => void
	onCurrencyChange?: (currency: string) => void
}

interface CurrencyOption {
	value: string
	label: string
	icon: string
}

export default function HeaderClient({ onLoginStatusChange, onCurrencyChange }: HeaderClientProps) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false)
	const [isSoundModalOpen, setIsSoundModalOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [notificationCount, setNotificationCount] = useState(0)
	const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption | null>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const { openModal, closeModal } = useModal()

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		const accessToken = Cookies.get('accessToken')
		const loggedIn = !!(refreshToken || accessToken)
		setIsLoggedIn(loggedIn)
		onLoginStatusChange(loggedIn)
	}, [onLoginStatusChange])

	const handleLoginClick = () => {
		openModal(<Auth closeModal={closeModal} />)
	}

	const handleWalletModalToggle = () => {
		openModal(<CryptoNavigation isOpen={true} onClose={closeModal} />)
	}

	const handleNotificationsModalToggle = () => {
		setIsNotificationsModalOpen((prev) => !prev)
	}

	const handleSoundModalToggle = () => {
		setIsSoundModalOpen((prev) => !prev)
	}

	const handleDropdownModalToggle = () => {
		setIsDropdownOpen((prev) => !prev)
	}

	return (
		<div className="w-full flex justify-between gap-5 items-center">
			{isLoggedIn ? (
				<div className="w-full flex justify-between items-center gap-5">
					<div className="flex justify-start">

						<Link href="/">
							<div className="flex gap-[10px]">
								<Image src="/icons/Snake Illustration (Traced) (2).svg" width={40} height={40} alt="logo" priority />
								<Image src="/icons/Cobra.svg" className='hidden m:block' width={130} height={40} alt="logo" priority />
							</div>
						</Link>
					</div>
					<div className="max-w-[271px] w-full h-10 flex justify-center items-center border border-bageColor rounded-[5px]">
						<CurrencySelect
							value={selectedCurrency}
							onChange={(option) => {
								setSelectedCurrency(option)
								if (onCurrencyChange) {
									onCurrencyChange(option.value)
								}
							}}
							styles={selectStyles}
						/>
						<button
							onClick={handleWalletModalToggle}
							className="max-w-[109px] w-full h-full flex gap-[10px] items-center px-[15px] bg-bageColor"
						>
							<Image src="/icons/header/wallet.svg" width={22} height={22} alt="" />
							<p className="text-sm font-light text-mainwhite">Wallet</p>
						</button>
					</div>
					<div className="flex justify-end">
						<div className="hidden m:flex items-center gap-[14px] mr-[15px] pr-[15px] border-r border-bageColor">
							<div className="relative h-5">
								<button onClick={handleNotificationsModalToggle} className="relative">
									<Image src="/icons/header/ring.svg" width={17} height={20} alt="" />
									{notificationCount > 0 && (
										<span className="absolute top-[10px] left-[10px] bg-red-500 text-bageColor text-[10px] font-medium rounded-full w-3 h-3 flex items-center justify-center bg-emerald">
											{notificationCount}
										</span>
									)}
								</button>
								<NotificationsModal
									isOpen={isNotificationsModalOpen}
									onClose={() => setIsNotificationsModalOpen(false)}
									onCountChange={(count) => setNotificationCount(count)}
								/>
							</div>
							<div className="relative h-5">
								<button onClick={handleSoundModalToggle}>
									<Image src="/icons/header/sound-ico.svg" width={25} height={20} alt="" />
								</button>
								<SoundModal
									isOpen={isSoundModalOpen}
									onClose={() => setIsSoundModalOpen(false)}
								/>
							</div>
						</div>
						<div className="">
							<div className="relative">
								<button
									className="relative max-w-[65px] flex gap-[10px] items-center"
									onClick={handleDropdownModalToggle}
								>
									<Image src="/icons/header/profile-ico.svg" alt="Profile" width={30} height={30} />
									<Image
										src="/icons/header/dropdown-arrow.svg"
										alt="Dropdown"
										width={13}
										height={15}
									/>
								</button>
								<DropdownModal
									isOpen={isDropdownOpen}
									onClose={() => setIsDropdownOpen(false)}
									isLoggedIn={isLoggedIn}
									setIsLoggedIn={setIsLoggedIn}
									onLoginStatusChange={onLoginStatusChange}
									ref={dropdownRef}
								/>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="w-full flex justify-between items-center gap-5">
					<Link href="/">
						<Image src="/logo.svg" width={179} height={40} alt="logo" priority />
					</Link>
					<button
						className="max-w-[112px] w-full h-10 text-emerald border border-secondary text-xl font-light rounded-[5px]"
						onClick={handleLoginClick}
					>
						Login
					</button>
				</div>
			)}
		</div>
	)
}