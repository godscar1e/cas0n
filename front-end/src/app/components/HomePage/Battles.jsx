
import { Roboto } from "next/font/google"
import Image from 'next/image'

import { useChat } from '@/app/context/ChatContext'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
})


export default function BattlesHomePageComp() {
	const { isChatOpen, setIsChatOpen } = useChat()

	return (
		<div className="flex justify-between gap-6 w-full">
			<div className="max-w-[357px] w-full">
				<h3 className='ml-5 text-2xl'>BATTLES</h3>
				<div className="max-w-[357px] w-full h-[307px] mt-5 px-[65px] flex flex-col justify-center bg-[url('/homepage/battles.png')] bg-cover bg-center rounded-[15px]">
					<div className="max-w-[226px] w-full flex flex-col gap-[7px]">
						<button className='w-full h-[42px] bg-gradient-to-r from-secondBlue to-bageColor rounded-[5px]'>JOIN TO  BATTLE</button>
						<button className='w-full h-[42px] bg-gradient-to-r from-bageColor to-secondBlue rounded-[5px]'>CREATE NEW BATTLE</button>
					</div>
				</div>
			</div>
			<div className={`w-full pt-5  ${isChatOpen ? 'max-w-[764px]' : 'max-w-[864px]'}`}>
				<div className="flex gap-[17px]">
					<h3 className='text-xl'>ACTIVE BATTLES</h3>
					<button className='max-w-[143px] w-full h-[26px] border border-placeholder rounded-[5px]'>View All Battles</button>
				</div>
				<div className="w-full px-5 pt-[17px] pb-[13px] mt-5 flex items-center rounded-[15px] bg-gradient-to-r from-darkBlue to-bageColor drop-shadow-custom-black">
					<Image src='/homepage/battles/case.png' width={131} height={110} alt='' />
					<div className="ml-5">
						<p className={`${roboto.className} text-lg font-bold leading-[13px]`}>495.00 <span className='text-emerald'>$</span></p>
						<p className={`${roboto.className} text-sm`}>Costs</p>
					</div>
					<div className="flex ml-6 gap-5 items-center">
						<div className="">
							<Image src='/homepage/battles/Ellipse 236.png' width={60} height={60} alt='' />
						</div>
						<div className="">
							<Image src='/homepage/battles/addtobattle.png' width={60} height={60} alt='' />
						</div>
						<div className="">
							<Image src='/homepage/battles/closedbattle.png' width={60} height={60} alt='' />
						</div>
						<div className="">
							<Image src='/homepage/battles/closedbattle.png' width={60} height={60} alt='' />
						</div>
					</div>
					<div className={`${roboto.className} max-w-[130px] w-full ml-10 text-xs font-medium`}>
						<button className='w-full h-[42px] flex gap-[5px] items-center justify-center rounded-[5px] bg-secondary'>
							<Image src='/icons/battle/Frame 1000002895.svg' width={18} height={18} alt='' />
							<p>Accept battle</p>
						</button>
						<button className='w-full h-[42px] mt-[5px] rounded-[5px] text-checkboxColor bg-secondBlue'>Watch</button>
					</div>
				</div>
				<div className="w-full px-5 pt-[17px] pb-[13px] mt-5 flex items-center rounded-[15px] bg-gradient-to-r from-darkBlue to-bageColor drop-shadow-custom-black">
					<Image src='/homepage/battles/case.png' width={131} height={110} alt='' />
					<div className="ml-5">
						<p className={`${roboto.className} text-lg font-bold leading-[13px]`}>495.00 <span className='text-emerald'>$</span></p>
						<p className={`${roboto.className} text-sm`}>Costs</p>
					</div>
					<div className="flex ml-6 gap-5 items-center">
						<div className="">
							<Image src='/homepage/battles/Ellipse 236.png' width={60} height={60} alt='' />
						</div>
						<div className="">
							<Image src='/homepage/battles/addtobattle.png' width={60} height={60} alt='' />
						</div>
						<div className="">
							<Image src='/homepage/battles/closedbattle.png' width={60} height={60} alt='' />
						</div>
						<div className="">
							<Image src='/homepage/battles/closedbattle.png' width={60} height={60} alt='' />
						</div>
					</div>
					<div className={`${roboto.className} max-w-[130px] w-full ml-10 text-xs font-medium`}>
						<button className='w-full h-[42px] flex gap-[5px] items-center justify-center rounded-[5px] bg-secondary'>
							<Image src='/icons/battle/Frame 1000002895.svg' width={18} height={18} alt='' />
							<p>Accept battle</p>
						</button>
						<button className='w-full h-[42px] mt-[5px] rounded-[5px] text-checkboxColor bg-secondBlue'>Watch</button>
					</div>
				</div>
			</div>
		</div>
	)
}
