interface LabelProps {
	content: string
}

export default function Label({ content }: LabelProps) {
	return (
		<label className='ml-[10px] text-xl font-light text-mainwhite leading-6'>{content}</label>
	)
}