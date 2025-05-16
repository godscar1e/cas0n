'use client'

import { useEffect, forwardRef, useRef } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { authService } from '@/app/services/auth.service'
import Image from 'next/image'
import ProgressBar from '../../ProgressBar/ProgressBar'
import { useProfile } from '@/app/hooks/useProfile'

interface DropdownModalProps {
	isOpen: boolean
	onClose: () => void
	isLoggedIn: boolean
	setIsLoggedIn: (value: boolean) => void
	onLoginStatusChange: (isLoggedIn: boolean) => void
}

const DropdownModal = forwardRef<HTMLDivElement, DropdownModalProps>(
	({ isOpen, onClose, isLoggedIn, setIsLoggedIn, onLoginStatusChange }, ref) => {
		const localRef = useRef<HTMLDivElement>(null)
		const { data, isLoading } = useProfile()

		// Если ref - функция, вызываем её с текущим элементом
		useEffect(() => {
			if (typeof ref === 'function') {
				ref(localRef.current)
			} else if (ref) {
				(ref as React.MutableRefObject<HTMLDivElement | null>).current = localRef.current
			}
		}, [ref])

		useEffect(() => {
			const handleClickOutsideDropdown = (event: MouseEvent) => {
				if (
					isOpen &&
					localRef.current &&
					!localRef.current.contains(event.target as Node)
				) {
					onClose()
				}
			}

			document.addEventListener('mousedown', handleClickOutsideDropdown, { capture: true })
			return () => {
				document.removeEventListener('mousedown', handleClickOutsideDropdown, { capture: true })
			}
		}, [isOpen, onClose])

		const handleLogout = async () => {
			try {
				const response = await authService.logout()
				if (response.data) {
					onClose()
					setIsLoggedIn(false)
					onLoginStatusChange(false)
					const refreshToken = Cookies.get('refreshToken')
					const accessToken = Cookies.get('accessToken')
					if (refreshToken || accessToken) {
						console.warn('Tokens were not fully removed:', {
							refreshToken,
							accessToken,
						})
					}
				} else {
					console.warn('Logout failed: No response data')
				}
			} catch (error) {
				console.error('Error during logout:', error)
			}
		}

		if (!isOpen) return null

		return (
			<div ref={localRef} className="absolute w-[254px] top-10 right-0 z-50">
				<div className="w-full py-[3px] bg-primary border border-bageColor rounded-[10px] shadow-lg">
					<div className="max-w-[245px] w-full m-auto py-[15px] flex justify-center bg-gradient-to-b from-secondBlue to-secondBlue rounded-[10px]">
						<div className="max-w-[215px] w-full text-mainwhite">
							<div className="p-4 rounded-[5px] bg-primary">
								<div className="flex items-center gap-2 pb-[15px] border-b border-b-bageColor">
									<Image
										src="/globe.svg"
										className="rounded-[50%]"
										width={30}
										height={30}
										alt=""
									/>
									<p className="uppercase">{data?.user.username}</p>
								</div>
								<div className="mt-[15px] flex gap-10 items-center">
									<div className="w-full">
										<ProgressBar modal={true} />
									</div>
								</div>
							</div>
							<div className="flex flex-col mt-[10px]">
								<button className="block px-[10px] py-[10px] rounded-[5px] text-left text-mainwhite hover:text-emerald hover:bg-primary">
									Wallet
								</button>
								<Link
									href="/profile/verify"
									className="block px-[10px] py-[10px] rounded-[5px] text-mainwhite hover:text-emerald hover:bg-primary"
								>
									VIP
								</Link>
								<Link
									href="/transactions/deposits"
									className="block px-[10px] py-[10px] rounded-[5px] text-mainwhite hover:text-emerald hover:bg-primary"
								>
									Vault
								</Link>
								<Link
									href="/transactions/deposits"
									className="block px-[10px] py-[10px] rounded-[5px] text-mainwhite hover:text-emerald hover:bg-primary"
								>
									Transactions
								</Link>
								<Link
									href="/profile/account"
									className="block px-[10px] py-[10px] rounded-[5px] text-mainwhite hover:text-emerald hover:bg-primary"
								>
									Settings
								</Link>
								<button className="px-[10px] py-[10px] rounded-[5px] text-left text-mainwhite font-normal hover:text-emerald hover:bg-primary">
									Live Support
								</button>
								<button
									onClick={handleLogout}
									className="w-full px-[10px] py-2 rounded-[5px] text-mainwhite hover:text-emerald hover:bg-primary"
								>
									Logout
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
)

export default DropdownModal