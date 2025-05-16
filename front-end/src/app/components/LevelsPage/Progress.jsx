'use client'

import { useProfile } from '../../hooks/useProfile'
import ProgressBar from '@/app/components/ProgressBar/ProgressBar'

export default function Progress() {
	const { data, isLoading } = useProfile()


	return (
		<div className="relative max-w-[547px] w-full h-[274px] mt-10 rounded-[15px] flex">
			{/* Блюр-бордер */}
			<div className="absolute inset-0 rounded-[15px] bg-gradient-to-b from-bageColor to-secondary blur-[2px]" />

			{/* Основной контент */}
			<div className="relative max-w-[531px] w-full h-[258px] m-auto p-10 rounded-[15px] bg-gradient-to-b from-[#0F212E] to-primary">
				{data ? (
					<>
						<h1 className="text-[24px] uppercase">{data.user.username}</h1>
						<div className="mt-[75px]">
							<ProgressBar />
						</div>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	)
}
