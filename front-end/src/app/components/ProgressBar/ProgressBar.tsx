'use client'

import { useEffect, useRef, useState } from 'react'
import SmallStar from '@/app/components/ui/Smallstar'
import { useProfile } from '@/app/hooks/useProfile'
import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
	modal?: boolean // Опциональный пропс для указания режима модального окна
}

export default function ProgressBar({ modal = false }: ProgressBarProps) {
	const { data, isLoading } = useProfile()
	const containerRef = useRef<HTMLDivElement>(null)
	const [dynamicHeight, setDynamicHeight] = useState<string | undefined>(
		modal ? '8px' : undefined
	)

	const experience = data?.user?.experience || 0

	// Логика уровней
	const levels = [
		{ name: 'None', maxExp: 1000, color: '#129379' },
		{ name: 'Bronze', maxExp: 5000, color: '#CE9F71' },
		{ name: 'Silver', maxExp: 10000, color: '#C0C0C0' },
		{ name: 'Gold', maxExp: 25000, color: '#FFD700' },
		{ name: 'Emerald', maxExp: 25001, color: '#7AFFC5' },
	]
	const currentLevelIndex = levels.findIndex(level => experience < level.maxExp)
	const currentLevel = levels[currentLevelIndex] || levels[levels.length - 1]
	const nextLevelExp = currentLevel?.maxExp || experience
	const previousLevelExp = levels[currentLevelIndex - 1]?.maxExp || 0

	// Расчет прогресса в процентах внутри уровня
	const progressPercentage =
		((experience - previousLevelExp) / (nextLevelExp - previousLevelExp)) * 100

	useEffect(() => {
		if (modal) {
			setDynamicHeight('8px') // Если modal=true, фиксируем 8px для прогресс-бара
			return
		}

		const resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				const { width } = entry.contentRect
				setDynamicHeight(width < 200 ? '8px' : undefined) // 8px при ширине <200px, иначе SCSS
			}
		})

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current)
		}

		return () => {
			if (containerRef.current) {
				resizeObserver.unobserve(containerRef.current)
			}
		}
	}, [modal])

	return (
		<div
			ref={containerRef}
			className={`max-w-[451px] flex flex-col gap-[10px] ${modal ? 'h-[40px]' : 'h-[81px]'}`}
		>
			<p className={`ml-[10px] text-[20px] font-light leading-6 ${modal ? 'hidden' : ''}`}>Your VIP Progress</p>
			<div>
				<div
					className={styles.custom_progress_bar}
					style={dynamicHeight ? { height: dynamicHeight } : undefined}
				>
					<div
						style={{
							width: `${progressPercentage}%`,
							backgroundColor: currentLevel.color,
						}}
					/>
				</div>
				<div className="flex justify-between align-middle items-center mt-[10px] px-[10px] h-[22px]">
					<div className="flex justify-between gap-[10px] align-middle text-lg font-extralight h-[22px]">
						<SmallStar stroke={currentLevel.color} />
						<p className="flex items-center">{currentLevel.name}</p>
					</div>
					<div className="flex justify-between text-lg font-extralight">
						{currentLevelIndex + 1 < levels.length ? (
							<div className="flex gap-[10px] align-middle h-[22px]">
								<SmallStar stroke={levels[currentLevelIndex + 1].color} />
								<p className="flex items-center">{levels[currentLevelIndex + 1].name}</p>
							</div>
						) : (
							<p className="flex items-center">Max</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}