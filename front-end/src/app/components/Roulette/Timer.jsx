import { useState, useEffect } from "react"

export default function Timer() {
	const [timeLeft, setTimeLeft] = useState(30) // Изначально 30 секунд
	const [lineWidth, setLineWidth] = useState(100) // Начальная ширина линии в процентах

	useEffect(() => {
		if (timeLeft <= 0) return

		const interval = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1) // Уменьшаем время
		}, 1000)

		return () => clearInterval(interval) // Очищаем интервал при размонтировании компонента
	}, [timeLeft])

	useEffect(() => {
		setLineWidth((timeLeft / 30) * 100) // Расчет ширины линии на основе оставшегося времени
	}, [timeLeft])

	// Рассчитываем ширину линии, ограниченную 212px
	const lineWidthInPx = Math.max((lineWidth / 100) * 212, 0)

	return (
		<div className="max-w-[469px] w-full flex gap-[10px] justify-center">
			{/* Первая линия (красная) */}
			<div
				className="mt-[13px] h-[3px] bg-[#E74C3C] rounded-[5px]"
				style={{
					width: `${lineWidthInPx}px`,
					height: '5px',
					transition: 'width 1s ease-out',
				}}
			></div>

			<h1 className='w-[26px] text-center text-mainwhite text-lg font-medium'>{timeLeft}</h1>

			{/* Вторая линия (синяя) */}
			<div
				className="mt-[13px] h-[3px] bg-lightBlue rounded-[5px]"
				style={{
					width: `${lineWidthInPx}px`,
					height: '5px', // Для второй линии тоже уменьшаем ширину
					transition: "width 1s linear", // Плавное уменьшение для второй линии
				}}
			></div>
		</div>
	)
}
