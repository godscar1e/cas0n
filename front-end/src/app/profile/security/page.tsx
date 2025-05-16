import Password from '@/app/components/Profile/Security/Password'
import TwoFactor from '@/app/components/Profile/Security/TwoFactor'


export default function SecurityPage() {
	return (
		<div className="">
			<Password />
			<TwoFactor/>
		</div>
	)
}
