
import Image from 'next/image'

export default function HowWorks() {

	const blocks = [
		{
			number: 1,
			title: 'Register & Top Up Balance',
			text: 'Create your account via email or social media, and add funds to your balance with a variety of payment methods.'
		},
		{
			number: 2,
			title: 'Register & Top Up Balance',
			text: 'Choose from a wide range of boxes, unbox products, and battle others for a chance to win big.'
		},
		{
			number: 3,
			title: 'Cashback or Claim Products',
			text: 'Sell unwanted products to Cobra for balance, withdraw them as crypto, or ship them to your address.'
		}
	]

	return (
		<div className="mt-[60px]">
			<h3 className="ml-5 text-2xl">HOW COBRA WORKS</h3>
			<div className="flex justify-between mt-5">
				{blocks.map((block, index) => (
					<div key={index} className="relative max-w-[375px] w-full h-[312px] p-5 rounded-[15px] text-center bg-bageColor">
						<div className="absolute w-10 h-10 flex justify-center items-center text-2xl text-emerald font-light border border-secondary rounded-[50%]">{block.number}</div>
						<div className="">
							<Image className='mt-5 mx-auto' src='/homepage/rect.png' width={195} height={127} alt='' />
							<h4 className='mt-5 text-xl text-mainwhite'>{block.title}</h4>
							<p className='max-w-[295px] w-full mx-auto mt-[10px] text-sm text-checkboxColor'>{block.text}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
