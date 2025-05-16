'use client'

import { useEffect, useRef } from 'react'
import { TabNavigation } from './TabNavigation'
import { DepositForm } from '../forms/DepositForm'
import { WithdrawForm } from '../forms/WithdrawForm'
import { TipForm } from '../forms/TipForm'
import { BuyCryptoForm } from '../forms/BuyCryptoForm'
import { useModal } from '../../../context/ModalContext'

export interface CryptoNavigationProps {
	isOpen: boolean
	onClose: () => void
}

export const CryptoNavigation: React.FC<CryptoNavigationProps> = ({ isOpen, onClose }) => {
	const cryptoNavRef = useRef<HTMLDivElement>(null)
	const { closeModal } = useModal()

	const tabs = [
		{ id: 'deposit', label: 'Deposit', content: <DepositForm /> },
		{ id: 'withdraw', label: 'Withdraw', content: <WithdrawForm /> },
		{ id: 'tip', label: 'Tip', content: <TipForm /> },
		{ id: 'buycrypto', label: 'Buy Crypto', content: <BuyCryptoForm /> },
	]

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				cryptoNavRef.current &&
				!cryptoNavRef.current.contains(event.target as Node)
			) {
				onClose()
				closeModal()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isOpen, onClose, closeModal])

	if (!isOpen) return null

	return (
		<div
			ref={cryptoNavRef}
			className=""
		>
			<TabNavigation tabs={tabs} defaultTab="deposit" />
		</div>
	)
}