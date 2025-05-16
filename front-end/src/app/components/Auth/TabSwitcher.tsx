import { FC } from 'react'

interface TabSwitcherProps {
	isLoginForm: boolean
	setTab: (tab: 'login' | 'register') => void
}

export const TabSwitcher: FC<TabSwitcherProps> = ({ isLoginForm, setTab }) => (
	<div className="flex h-[35px]">
		<button
			className={`w-full max-w-[410px] pb-[3px] text-center text-2xl font-medium border-b ${!isLoginForm ? 'border-b-secondary text-secondary' : 'text-mainwhite border-b-mainwhite'}`}
			onClick={() => setTab('register')}
		>
			Register
		</button>
		<button
			className={`w-full max-w-[410px] pb-[3px] text-center text-2xl font-medium border-b ${isLoginForm ? 'border-b-secondary text-secondary border-primary' : 'text-mainwhite border-b-mainwhite'}`}
			onClick={() => setTab('login')}
		>
			Login
		</button>
	</div>

)
