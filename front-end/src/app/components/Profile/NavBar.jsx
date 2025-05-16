"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function ProfileNavBar() {
	const pathname = usePathname()
	const [activeStyles, setActiveStyles] = useState({ left: 0, width: 0 })
	const containerRef = useRef(null)

	const links = [
		{ href: '/profile/account', label: 'Account' },
		{ href: '/profile/verify', label: 'Verify' },
		{ href: '/profile/security', label: 'Security' },
		{ href: '/profile/preferences', label: 'Preferences' },
		{ href: '/profile/sessions', label: 'Sessions' },
		{ href: '/profile/ignoredusers', label: 'Ignored Users' },
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
		<div className='max-w-[1249px] w-full'>
			<div className="flex gap-[9px]">
				<Image src='/icons/profile/gear.svg' width={29} height={29} alt='Settings Icon' />
				<h1 className='text-2xl text-mainwhite'>Settings</h1>
			</div>
			<div className="max-w-[710px] w-full min-w-[698px] h-[56px] mt-5 py-[10px] px-[15px] flex items-center rounded-[5px] bg-bageColor drop-shadow-custom-black">
				<div ref={containerRef} className="relative max-w-[665px] w-full h-9 flex justify-between items-center text-lg text-checkboxColor font-light">
					{/* Двигающийся фон под активной ссылкой */}
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
		</div>
	)
}
