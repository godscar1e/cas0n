
import weapons from "@/app/utils/cases/weapons.json"
import CasesRoulette from "@/app/components/Cases/CasesRoulette"


export default function CasesPage() {

	const weaponsCount = 150
	const transitionDuration = 10

	return (
		<div className='flex justify-center items-center'>
			<div className=''>
				<CasesRoulette
					weapons={weapons}
					weaponsCount={weaponsCount}
					transitionDuration={transitionDuration}
				/>
			</div>
		</div>
	)
}
