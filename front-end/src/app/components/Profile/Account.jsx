'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useProfile } from '../../hooks/useProfile'
import ProgressBar from '../ProgressBar/ProgressBar'

export default function AcountComp() {
	const { data, isLoading } = useProfile()

	const formatDate = (dateString) => {
		if (!dateString) return ''
		return new Date(dateString).toLocaleDateString('ru-RU')
	}

	return (
		<div className="grid grid-cols-[598px_auto] grid-rows-[60px_81px] items-center gap-x-5 gap-y-7 mt-[14px] max-[1630px]:flex max-[1630px]:flex-wrap max-[1630px]:gap-4">
			{data ? (
				<>
					<div className="relative max-w-[598px] w-full h-[68px] rounded-[5px]">

						<div className="absolute inset-0 -z-10 rounded-[5px] bg-gradient-to-b from-bageColor to-secondary blur-[2px]" />
						<div className="max-w-[590px] w-full h-[60px] pl-5 pr-10 m-auto my-1 flex justify-between items-center rounded-[5px] bg-primary">
							<div className="">
								<p className='uppercase text-lg font-light'>{data.user.username}</p>
							</div>
							<Image src='/icons/profile/change-ico.svg' width={22} height={22} alt='' />
						</div>
					</div>
					<div className="flex items-center ml-auto max-w-[451px] w-full h-[60px] font-light">
						<div className="max-w-[122px] w-full h-[60px]  border-r border-r-placeholder pr-8">
							<p className='text-xl'>Join Date</p>
							<p className='mt-[13px] text-lg text-mainwhite leading-[22px]'>{formatDate(data.user.createdAt)}</p>
						</div>
						<div className="max-w-[160px] w-full h-[60px] px-8 border-r border-r-placeholder">
							<p className='text-xl'>Total bets</p>
							<p className='mt-[13px] text-lg text-mainwhite leading-[22px]'>{formatDate(data.user.createdAt)}</p>
						</div>
						<div className="max-w-[167px] w-full h-[60px] pl-8">
							<p className='text-xl'>Total wagered</p>
							<p className='mt-[13px] text-lg text-mainwhite leading-[22px]'>{formatDate(data.user.createdAt)}</p>
						</div>
					</div>
					<div className="flex gap-10 items-center">
						<div className="max-w-[451px] w-full">
							<ProgressBar />
						</div>
						<Link href='/levels' className='max-w-[107px] w-full h-[41px] flex items-center px-[11px] text-sm font-light bg-bageColor rounded-[5px] drop-shadow-custom-black'>VIP Progress</Link>
					</div>
					<div className='mt-auto mb-5'>
						<Link href='/levels' className="max-w-[209px] w-full h-[41px] ml-auto  flex items-center px-[11px] text-sm font-light bg-bageColor rounded-[5px] drop-shadow-custom-black">Rate Back & More Statistics</Link>
					</div>
				</>
			) : (
				<p>Loading...</p>
			)
			}
		</div >
	)
}
