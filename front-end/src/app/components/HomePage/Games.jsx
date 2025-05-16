
export default function Games() {
	return (
		<div className="mt-[60px]">
			<h3 className='ml-5 text-2xl'>ORIGINAL GAMES</h3>
			<div className="flex justify-between mt-4">
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index} className="w-[179px] h-[240px] rounded-[15px] bg-bageColor"></div>
				))}
			</div>

		</div>
	)
}
