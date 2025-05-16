import Image from 'next/image'

export default function GameRoulette() {
	return (
		<div className="mt-[100px] relative pb-[60px] border-b-[3px] border-bageColor">
			<h3 className="ml-5 text-2xl">ORIGINAL COBRA ROULETTE</h3>
			<div className="relative w-[1209px] h-[220px] p-1 flex justify-between mt-5 rounded-[15px]">
				<div className="absolute inset-0 rounded-[15px] bg-gradient-to-b from-bageColor to-secondary blur-[2px]" />
				<div className="w-full h-[212px] ml-[-2px] px-11 bg-[url('/homepage/bg.png')] rounded-[15px] z-50"> 
					<div className="flex justify-between max-w-[692px] w-full items-center">
						<Image src="/homepage/casinboImg.png" width={329} height={212} alt="" />
						<button className='max-w-[263px] w-full h-[69px] rounded-[5px] border border-emerald text-2xl font-light text-emerald'>START PLAY</button>
					</div>
					<div className="absolute right-11 bottom-[4px]">
						<Image src="/homepage/girls.png" width={329} height={325} alt="" />
					</div>
				</div>
			</div>
		</div>
	)
}
