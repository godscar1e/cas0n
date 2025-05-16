'use client'

import { useEffect, useRef, forwardRef, useState } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import notificationService from '@/app/services/notification.service'
import { INotification } from '@/app/types/notification.types'
import { useProfile } from '@/app/hooks/useProfile'

export interface NotificationsModalProps {
	isOpen: boolean
	onClose: () => void
	onCountChange?: (count: number) => void
}

const NotificationsModal = forwardRef<HTMLDivElement, NotificationsModalProps>(
	({ isOpen, onClose, onCountChange }, ref) => {
		const localRef = useRef<HTMLDivElement>(null)
		const [notifications, setNotifications] = useState<INotification[]>([])
		const [isLoading, setIsLoading] = useState(false)
		const { data: userData, isLoading: isUserLoading } = useProfile()

		// Обработка внешнего ref
		useEffect(() => {
			if (typeof ref === 'function') {
				ref(localRef.current)
			} else if (ref) {
				(ref as React.MutableRefObject<HTMLDivElement | null>).current = localRef.current
			}
		}, [ref])

		// Загрузка уведомлений
		useEffect(() => {
			if (!isOpen || isUserLoading || !userData?.user.id) {
				setNotifications([])
				return
			}

			const getNotifications = async () => {
				setIsLoading(true)
				const userId = String(userData.user.id)
				try {
					const response = await notificationService.getNotifications(userId)
					console.log('Fetched notifications:', response?.notifications)
					setNotifications(response?.notifications || [])
					if (onCountChange) {
						onCountChange(response?.notifications?.length || 0)
					}
				} catch (error) {
					console.error('Error getting notifications:', error)
					setNotifications([])
					if (onCountChange) {
						onCountChange(0)
					}
				} finally {
					setIsLoading(false)
				}
			}

			getNotifications()
		}, [isOpen, isUserLoading, userData, onCountChange])

		// Обработка кликов вне модального окна
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					isOpen &&
					localRef.current &&
					!localRef.current.contains(event.target as Node)
				) {
					onClose()
				}
			}

			document.addEventListener('mousedown', handleClickOutside, { capture: true })
			return () => {
				document.removeEventListener('mousedown', handleClickOutside, { capture: true })
			}
		}, [isOpen, onClose])

		const formatDate = (dateString?: string | Date): string => {
			if (!dateString) return 'Unknown time'
			try {
				return format(new Date(dateString), 'MMM d, yyyy h:mm a')
			} catch (error) {
				console.error('Error formatting date:', error)
				return 'Unknown time'
			}
		}

		if (!isOpen) return null

		return (
			<div
				ref={localRef}
				className="absolute top-10 right-0 w-[370px] h-[310px] py-[3px] bg-primary border border-bageColor rounded-[5px] shadow-lg z-50"
			>
				<div className="max-w-[362px] w-full h-[302px] m-auto py-[10px] bg-gradient-to-b from-secondBlue to-secondBlue rounded-[5px]">
					<div className="w-full border-b border-bageColor">
						<div className="flex gap-[10px] items-center px-[15px] pb-[10px]">
							<Image src="/icons/header/ring.svg" width={15} height={17} alt="" />
							<h2 className="text-sm">Notifications</h2>
						</div>
					</div>
					<div className="h-[264px] pt-[10px] px-[15px] flex flex-col gap-5">
						{isLoading || isUserLoading ? (
							<div className="my-auto text-center">
								<p className="text-lg text-emerald">Loading notifications...</p>
							</div>
						) : notifications.length === 0 ? (
							<div className="my-auto text-center">
								<h3 className="text-2xl leading-[29px] text-emerald">
									No notifications available
								</h3>
								<p className="mt-[10px] text-lg">
									You will receive notifications about your account activity here.
								</p>
							</div>
						) : (
							<div className="flex flex-col gap-5 pb-5 overflow-y-auto scrollbar-hidden">
								{notifications.map((notification: any, index: any) => (
									<div key={index} className="flex flex-col gap-[3px]">
										<h2 className="text-emerald font-medium leading-[19px]">
											{notification.type}
										</h2>
										<p className="text-sm leading-tight">{notification.message}</p>
										<p className="text-xs text-placeholder">
											{formatDate(notification.createdAt)}
										</p>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		)
	}
)

export default NotificationsModal