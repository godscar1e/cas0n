'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLeftBar } from '@/app/context/LeftBarContext'
import styles from './LeftBar.module.scss'

const userLinks = [
	{ href: '/', src: '/icons/leftbar/games_icons/Exclude (1).png', label: 'Home' },
	{ href: '/games/battles', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'My Bets' },
]

const gameLinks = [
	{ href: '/games/roulette', src: '/icons/leftbar/games_icons/Exclude (1).png', label: 'Roulette' },
	{ href: '/games/battles', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'Battles' },
	{ href: '/games/cases', src: '/icons/leftbar/games_icons/cases-ico.svg', label: 'Cases' },
	{ href: '/games/crush', src: '/icons/leftbar/games_icons/crush-ico.svg', label: 'Crush' },
	{ href: '/games/miner', src: '/icons/leftbar/games_icons/miner-ico.svg', label: 'Miner' },
]

const siteLinks = [
	{ href: '/about', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'VIP System' },
	{ href: '/contact', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'Leaderboard' },
	{ href: '/contact', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'Promotions' },
	{ href: '/contact', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'Affiliate' },
	{ href: '/contact', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'Sponsorship' },
	{ href: '/contact', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'Earn with us' },
]

const profileLinks = [
	{ href: '/profile', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'Wallet' },
	{ href: '/orders', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'Vault' },
	{ href: '/transactions/deposits', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'Transactions' },
	{ href: '/orders', src: '/icons/leftbar/games_icons/battles-ico.svg', label: 'Settings' },
]

const LinkList = ({ links, isLeftBarOpen }) => (
	<ul className={`${isLeftBarOpen ? '' : 'gap-6'}`}>
		{links.map((link, index) => (
			<li key={index}>
				<Link href={link.href} className="flex items-center gap-[10px] h-[40px] hover:text-emerald">
					<Image src={link.src} width={22} height={22} alt={link.label} />
					{isLeftBarOpen && <p className="text-sm">{link.label}</p>}
				</Link>
			</li>
		))}
	</ul>
)

export default function LeftBar() {
	const { isLeftBarOpen, setIsLeftBarOpen } = useLeftBar()
	const [isProfileOpen, setIsProfileOpen] = useState(false)

	return (
		<div
			className={`hidden h-[100vh] xl:block bg-darkBlue transition-all duration-500 ease-in-out ${isLeftBarOpen ? 'max-w-[225px]' : 'max-w-[80px] min-w-[80px] overflow-hidden'}`}
		>
			<div className="drop-shadow-custom-black">
				<div
					className={`flex items-center w-full h-20 py-[15px] gap-10 bg-secondBlue ${isLeftBarOpen ? 'px-5' : 'w-[80px] px-2'}`}
				>
					<button onClick={() => setIsLeftBarOpen((prev) => !prev)} className="text-white mb-2">
						<Image src="/icons/chat_icons/open_close-ico.svg" width={27} height={16} alt="" />
					</button>
				</div>
			</div>
			<div className="flex flex-col h-[calc(100vh-80px)]">
				<div className="drop-shadow-custom-black h-15 p-5 border-b border-b-bageColor">
					<input
						type="text"
						className="w-full h-[40px] px-5 border border-bageColor rounded-[5px] bg-transparent"
					/>
				</div>
				<div className={`${styles.leftbarMenu} flex flex-col overflow-y-auto`}>
					{/* Секция userLinks */}
					<div className={`${styles.sector} py-4`}>
						<div
							className={`${isLeftBarOpen ? '' : 'flex justify-center py-[10px]'} ${styles.body} flex flex-col gap-2`}
						>
							<LinkList links={userLinks} isLeftBarOpen={isLeftBarOpen} />
						</div>
					</div>
					{/* Кнопка Profile и выпадающий список */}
					<div className={`${styles.sector} ${isLeftBarOpen ? 'px-5' : 'px-2'}`}>
						<button
							onClick={() => setIsProfileOpen((prev) => !prev)}
							className={`flex items-center gap-[10px] h-[40px] w-full text-left text-white rounded-[5px] hover:text-emerald ${isLeftBarOpen ? 'justify-between' : 'justify-center'}`}
						>
							<div className="flex items-center gap-[10px]">
								<Image
									src="/icons/header/profile-ico.svg"
									width={22}
									height={22}
									alt="Profile"
								/>
								{isLeftBarOpen && <p className="text-mainwhite text-sm">Profile</p>}
							</div>
							{isLeftBarOpen && (
								<Image
									src="/icons/header/dropdown-arrow.svg"
									width={13}
									height={13}
									alt="Toggle Dropdown"
									className={`${styles.arrow} ${isProfileOpen ? styles.arrowOpen : styles.arrowClosed}`}
								/>
							)}
						</button>
						<div
							className={`${styles.profile_dropdown} ${isProfileOpen ? styles.open : styles.closed}`}
						>
							<LinkList links={profileLinks} isLeftBarOpen={isLeftBarOpen} />
						</div>
					</div>
					{/* Секции gameLinks и siteLinks */}
					{[gameLinks, siteLinks].map((links, index) => (
						<div key={index} className={`${styles.sector} py-4`}>
							<div
								className={`${isLeftBarOpen ? '' : 'flex justify-center py-[10px]'} ${styles.body} flex flex-col gap-2`}
							>
								<LinkList links={links} isLeftBarOpen={isLeftBarOpen} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}