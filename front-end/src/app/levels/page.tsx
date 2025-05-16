import LeftBar from '../components/LeftBar/LeftBar'
import Progress from '../components/LevelsPage/Progress'
import Revards from '../components/LevelsPage/Revards'
import VipSystem from '../components/LevelsPage/VipSystem/VipSystem'
import Benefits from '../components/LevelsPage/Benefits/Benefits'
import Questions from '../components/LevelsPage/Questions/Questions'

export default function LevelsPage() {
	return (
		<div className="flex max-w-[1369px] w-full h-[434px]">
			<div className="w-full">
				<div className="w-full px-[80px] pt-20 pb-[80px]">
					<div className='flex items-end justify-between h-[274px] gap-10'>
						<Progress />
						<Revards />
					</div>
				</div>
				<div className="w-full flex flex-col justify-center px-5 bg-primary pt-[60px]">
					<VipSystem />
					<Benefits />
					<Questions />
				</div>
			</div>
		</div>
	)
}
