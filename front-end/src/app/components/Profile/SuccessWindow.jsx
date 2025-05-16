import Image from 'next/image'

export default function SuccessWindow({
	title,
	highlightedText,
	highlightColor = 'text-emerald',
	onClose,
}) {
	const parts = highlightedText ? title.split(highlightedText) : [title]
	const beforeHighlighted = parts[0] || ''
	const afterHighlighted = parts[1] || ''

	return (
		<div className="absolute  max-w-[600px] w-full h-auto bg-primary rounded-[15px] p-[40px]">
			<div className="text-center">
				<Image className="mx-auto" src="/icons/profile/verifMark.svg" width={70} height={75} alt="" />
				<p className="mt-[37px] h-[78px] text-mainwhite text-[32px] font-medium">
					{beforeHighlighted}
					{highlightedText && <span className={highlightColor}>{highlightedText}</span>}
					{afterHighlighted}
				</p>
				<button
					onClick={onClose} // Подключаем onClose
					className="max-w-[291px] w-full h-[42px] mt-10 bg-secondary shadow-md rounded-[5px] text-lg text-white"
					disabled={!onClose} // Отключаем кнопку, если onClose не передан
				>
					Complete
				</button>
			</div>
		</div>
	)
}