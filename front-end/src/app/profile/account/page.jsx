import AccountComp from '../../components/Profile/Account'

export default function Account() {
	return (
		<div className="w-full h-auto mx-auto mt-10 px-10 py-5 rounded-[5px] border border-placeholder max-[1630px]:max-h-auto">
			<div className="">
				<p className='ml-[10px] text-xl font-light text-mainwhite leading-6'>User Information</p>
				<AccountComp />
			</div>
		</div>
	)
}
