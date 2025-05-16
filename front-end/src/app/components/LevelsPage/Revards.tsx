import Image from 'next/image'

export default function Revards() {
	return (
		<div className="relative max-w-[622px] w-full">
			<h1 className='uppercase text-[20px] font-light ml-5'>Available rewards</h1>
			<div className="relative w-full h-[230px] mx-auto mt-[20px] rounded-[15px] flex">

				<div className="absolute inset-0 rounded-[15px] bg-gradient-to-b from-bageColor to-secondary blur-[2px]" />

				<div className="relative max-w-[606px] w-full h-[214px] m-auto p-10 rounded-[15px] bg-gradient-to-b from-[#0F212E] to-primary">
					<div className="flex flex-col justify-center max-w-[279px] w-full mx-auto">
						<div className="flex justify-center items-center h-[45px] relative gap-[5px] border-b border-secondary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-mainwhite after:blur-[4px] after:z-[0] after:translate-y-[2px]">
							<Image src="/icons/gift-ico.svg" width={32} height={32} alt="gift" />
							<Image
								className="pb-[13px]"
								src="/icons/gift-ico2.svg"
								width={42}
								height={42}
								alt="gift"
							/>
							<Image src="/icons/gift-ico3.svg" width={32} height={32} alt="gift" />
						</div>
						<p className='mt-[10px] text-[20px] font-light text-center'>No rewards available</p>
						<p className='mt-1 text-[16px] font-extralight text-center leading-[19.36px]'>You currently don’t have any VIP Rewards available to claim.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
