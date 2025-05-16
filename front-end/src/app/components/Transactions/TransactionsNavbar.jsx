"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Filter from '@/app/components/Transactions/Filter'

export default function TransactionsNavbar() {
	const pathname = usePathname()
	const [activeStyles, setActiveStyles] = useState({ left: 0, width: 0 })
	const containerRef = useRef(null)

	const links = [
		{ href: '/transactions/deposits', label: 'Deposits' },
		{ href: '/transactions/withdrawals', label: 'Withdrawals' },
		{ href: '/transactions/casinobets', label: 'Casino Bets' },
		{ href: '/transactions/sportsbets', label: 'Sports Bets' },
		{ href: '/transactions/tipnrain', label: 'Tip/Rain' },
		{ href: '/transactions/other', label: 'Other' },
	]

	useEffect(() => {
		if (containerRef.current) {
			const activeLink = containerRef.current.querySelector(`[data-active="true"]`)
			if (activeLink) {
				setActiveStyles({
					left: activeLink.offsetLeft,
					width: activeLink.offsetWidth,
				})
			}
		}
	}, [pathname])

	return (
		<div>
			<div className="flex gap-[9px]">
				<Image src='/icons/transactions/trans-ico.svg' width={29} height={29} alt='' />
				<h1 className='text-2xl text-mainwhite'>Transactions</h1>
			</div>
			<div className="flex justify-between items-center mt-5">
				<div className="max-w-[712px] w-full h-[56px] py-[10px] px-[15px] flex items-center rounded-[5px] bg-bageColor drop-shadow-custom-black">
					<div ref={containerRef} className="relative max-w-[682px] w-full h-9 flex justify-between items-center text-lg text-checkboxColor font-light">
						<div
							className="absolute top-0 bottom-0 bg-placeholder rounded-[5px] transition-all duration-300 ease-in-out"
							style={{ left: activeStyles.left, width: activeStyles.width, height: '36px' }}
						/>
						{links.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								data-active={pathname === href}
								className={`relative px-[15px] py-[7px] rounded-md z-10 transition ${pathname === href ? 'text-mainwhite' : ''}`}
							>
								{label}
							</Link>
						))}
					</div>
				</div>
				<Filter />
			</div>
		</div>
	)
}
