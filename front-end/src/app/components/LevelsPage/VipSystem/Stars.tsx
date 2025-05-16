import Image from 'next/image'
import Star from '../../ui/Star'

export default function Stars() {

	const steps = [
		{
			icon: '/icons/star.svg',
			gradient: 'from-bronze to-silver',
			color: 'text-bronze', // Цвет для stroke
			strokeColor: '#CE9F71', // Цвет обводки
			width: 35,
			height: 32,
		},
		{
			icon: '/icons/star.svg',
			gradient: 'from-silver to-gold',
			color: 'text-silver',
			strokeColor: '#C0C0C0', // Цвет обводки
			width: 35,
			height: 32,
		},
		{
			icon: '/icons/star.svg',
			gradient: 'from-gold to-emerald',
			color: 'text-gold',
			strokeColor: '#FFE766', // Цвет обводки
			width: 35,
			height: 32,
		},
		{
			icon: '/icons/star.svg',
			gradient: 'from-emerald to-[#0F2A36]',
			color: 'text-emerald',
			strokeColor: '#7AFFC5', // Цвет обводки
			width: 35,
			height: 32,
		},
	]

	return (
		<div className="flex justify-between items-center mx-auto max-w-[1209px] w-full space-x-4 py-10">
			{steps.map((step, index) => (
				<div key={index} className="relative flex mx-auto items-center">
					{/* Круглая иконка */}
					<div className="w-[60px] h-[60px] flex justify-center items-center bg-[#2C424F] rounded-full">
						<Star stroke={step.strokeColor} />
					</div>

					{/* Линия после иконки */}
					{index !== steps.length - 1 ? (
						<div
							className={`ml-[10px] transform w-[230px] h-[3px] bg-gradient-to-r ${step.gradient}`}
						></div>
					) : (
						<div
							className={`ml-[10px] transform w-[209px] h-[3px] bg-gradient-to-r from-emerald to-[#0F2A36]`}
						></div>
					)}
				</div>
			))}
		</div>
	)
}
