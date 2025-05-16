import Image from 'next/image'
import Stars from './Stars'
import Statuses from './Statuses'


export default function VipSystem() {
	return (
		<div className="relative flex flex-col justify-center max-w-[1369px]">
			{/* Основной контент */}
			<div className="flex gap-5 justify-center items-center z-10">
				<Image src='/icons/lightstar.svg' width={32} height={29} alt='lightstar' />
				<h1 className='text-2xl font-light '>VIP SYSTEM FROM NAME</h1>
			</div>
			<div className="max-w-[1209px] mx-auto">
				<Stars />
				<Statuses />
			</div>
		</div>
	)
}
