import { toast as sonnerToast } from 'sonner'
import Image from 'next/image'

interface ToastProps {
	id: string | number
	title: string
	description: string
	type: 'success' | 'fail'
}

function toast(toast: Omit<ToastProps, 'id'>) {
	return sonnerToast.custom((id: any) => (
		<Toast
			id={id}
			title={toast.title}
			description={toast.description}
			type={toast.type}
		/>
	))
}

export function Toast(props: ToastProps) {
	const { title, description, id, type } = props

	const textColor = type === 'success' ? 'text-[#7AFFC5]' : 'text-[#E74C3C]'
	const borderColor = type === 'success' ? '#7AFFC5' : '#E74C3C'
	const iconSrc =
		type === 'success' ? '/icons/toast/success-ico.svg' : '/icons/toast/error-ico.svg'

	return (
		<div
			className="flex w-[300px] px-[15px] py-[10px] rounded-[5px] bg-darkBlue border-[2px]"
			style={{ borderColor }}
		>
			<div className="flex justify-between gap-5 items-center w-full">
				<div className="w-full">
					<p className={textColor}>{title}</p>
					<p className={textColor}>{description}</p>
				</div>
				<Image
					src={iconSrc}
					width={24}
					height={24}
					alt={type === 'success' ? 'Success' : 'Error'}
					className=""
				/>
			</div>
		</div>
	)
}

export default toast