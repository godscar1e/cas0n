import Lock from '@/app/components/ui/Lock'
import Mark from '@/app/components/ui/Mark'

export default function Statuses() {

	const statuses = [
		{
			name: 'bronze',
			color: '#CE9F71',
			wagerAmount: '10k>',
		},
		{
			name: 'silver',
			color: '#C0C0C0',
			wagerAmount: '50k>',
		},
		{
			name: 'gold',
			color: '#FFE766',
			wagerAmount: '100k>',
		},
		{
			name: 'emerald',
			color: '#7AFFC5',
			wagerAmount: '250k>',
		},
	]

	const advantagesList = [
		{
			title: "bronze",
			list: ["Monthly bonuses", "Level Up bonuses", "Rakeback", "Weekly bonuses", "Level Up bonuses"]
		},
		{
			title: "silver",
			list: ["Monthly bonuses", "Level Up bonuses", "Rakeback", "Weekly bonuses", "Level Up bonuses"]
		},
		{
			title: "gold",
			list: ["Monthly bonuses", "Level Up bonuses", "Rakeback", "Weekly bonuses", "Level Up bonuses"]
		},
		{
			title: "emerald",
			list: ["Monthly bonuses", "Level Up bonuses", "Rakeback", "Weekly bonuses", "Level Up bonuses"]
		}
	]

	return (
		//max-w-[1407px] бордера снизу
		<div className="flex justify-between gap-5 pb-10 relative border-b border-secondary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-mainwhite after:blur-[4px] after:z-[0] after:translate-y-[2px]">
			{statuses.map((status, index) => {
				// Найдем список преимуществ для текущего статуса
				const advantages = advantagesList.find(adv => adv.title === status.name)?.list || []

				return (
					<div key={index} className="max-w-[280px] w-full h-[341px] rounded-[15px] p-[25px] bg-bageColor drop-shadow-custom-black">
						<div className="flex justify-between items-center">
							<div
								className={`max-w-[112px] w-full h-8 drop-shadow-custom-black rounded-[5px] ${status.name === 'bronze'
									? 'bg-bronze'
									: status.name === 'silver'
										? 'bg-silver'
										: status.name === 'gold'
											? 'bg-gold'
											: 'bg-emerald'
									}`}
							>
								<p className="capitalize flex justify-center align-middle text-bageColor text-lg py-[3px]">{status.name}</p>
							</div>
							<Lock fill={status.color} />
						</div>
						<div className="pb-[10px] border-b border-mainwhite">
							<p className='mt-5 text-2xl font-normal leading-[29px] '>${status.wagerAmount}</p>
							<p className='text-base leading-[19.36px] font-light'>Wager amount</p>
						</div>
						<div className="pt-5">
							<ul className='flex flex-col gap-[6px]'>
								{advantages.map((item, idx) => (
									<li key={idx} className="mb-[6px] flex gap-[10px] items-center align-middle h-[17px] text-sm font-extralight">
										<Mark fill={status.color} />
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
				)
			})}
		</div>
	)
}
