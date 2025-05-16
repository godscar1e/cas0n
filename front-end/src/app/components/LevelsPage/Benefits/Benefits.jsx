import Image from 'next/image'

export default function Benefits() {
	const benefits = [
		{
			title: '24/7 Support',
			text: 'We take pride in our customer service team. Access round-the-clock live support to address any questions you have, ensuring your needs are always met.',
			image: ''
		},
		{
			title: 'Dedicated VIP host',
			text: 'Receive an unmatched experience with a dedicated VIP host, who will support and tailor benefits such as events and promotions to your needs.',
			image: ''
		},
		{
			title: 'Simplified rewards',
			text: 'Effortlessly access and claim your rewards through our simple and intuitive interface, setting a new industry standard with a best-in-class rewards experience.',
			image: ''
		},
		{
			title: 'Reloads',
			text: 'Claim reload rewards once per day, which increase in value as you rank up on Lootbox.',
			image: ''
		},
	]
	return (
		<div className="mt-[60px] flex flex-col items-center">
			<h1 className='flex gap-[10px] align-middle items-center text-2xl font-light h-[29px]'>
				<Image src='/icons/crown.svg' width={30} height={29} alt='' />
				<p className='leading-[29px]'>VIP BENEFITS FROM WINSTAR</p>
			</h1>

			<div className="grid grid-cols-2 gap-10 justify-center max-w-[1209px] mx-auto mt-10">
				{benefits.map((benefit, index) => (
					<div key={index} className="relative flex mx-auto items-center gap-5 py-5 pl-5 pr-[45px] drop-shadow-custom-black rounded-[15px] bg-bageColor">
						<div className="w-[78px] h-[78px] bg-mainwhite rounded-[15px]">

						</div>
						{/* <Image src='{benefit.image}' width={96} height={96} /> */}
						<div className="flex flex-col align-top h-[78px]">
							<h3 className='text-lg font-light'>{benefit.title}</h3>
							<p className='max-w-[452px] w-full text-sm font-extralight leading-[16px]'>{benefit.text}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
