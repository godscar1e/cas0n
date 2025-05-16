'use client'

import React, { useState } from "react"
import Image from 'next/image'

export default function Questions() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)

	const toggleAccordion = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index)
	}

	const questions = [
		{
			question: "What is your return policy?",
			answer:
				"You can return any item within 30 days of purchase as long as it is in its original condition.",
		},
		{
			question: "How long does shipping take?",
			answer: "Shipping typically takes 3-5 business days, depending on your location.",
		},
		{
			question: "Do you offer international shipping?",
			answer:
				"Yes, we ship to many countries around the world. Shipping fees and times vary by destination.",
		},
		{
			question: "Can I track my order?",
			answer: "Yes, once your order is shipped, you will receive a tracking number via email.",
		},
		{
			question: "What payment methods do you accept?",
			answer: "We accept Visa, Mastercard, PayPal, and other major payment methods.",
		},
		{
			question: "How do I contact customer service?",
			answer:
				"You can contact us via email at support@example.com or call us at (123) 456-7890.",
		},
	]

	return (
		<div className="max-w-[1209px] w-full mx-auto mt-[60px] pb-[120px]">
			<div className="flex gap-[10px] align-middle items-center h-6 ml-[10px] mb-5">
				<Image src='/icons/icon.svg' width={24} height={24} alt='' />
				<h3 className="text-lg leading-6 font-light">Frequently Asked Questions</h3>
			</div>
			<div className="grid grid-cols-2 gap-10">
				{questions.map((item, index) => (
					<div
						key={index}
						className={`bg-bageColor py-[15px] pl-10 pr-[22px] rounded-[15px] cursor-pointer transition-all duration-300 flex items-center justify-between drop-shadow-custom-black ${activeIndex === index ? "shadow-lg items-start:important" : ""
							}`}
						onClick={() => toggleAccordion(index)}
					>
						<div className=''>
							<h4 className="text-base leading-[22px] font-light">{item.question}</h4>
							<div
								className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? "max-h-screen opacity-100 mt-2" : "max-h-0 opacity-0"
									}`}
							>
								<p className="w-[450px] text-sm font-extralight">{item.answer}</p>
							</div>
						</div>

						<span
							className={`transform transition-transform duration-300 w-[9px] h-[16px] ${activeIndex === index ? "-rotate-90" : "rotate-0"
								}`}
						>
							<img src='/icons/arrow.svg' width={9} height={16} alt='' />
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
