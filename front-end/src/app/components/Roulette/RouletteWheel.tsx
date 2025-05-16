'use client'

import { useEffect, useRef, useState } from 'react'

const numbers = [
	0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
	24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
]

const redNumbers = [
	1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]

interface RouletteWheelProps {
	startSpin: boolean // Indicates whether to start the spin
	onSpinEnd: (result: number) => void // Callback when spin ends, passing the result
}

export default function RouletteWheel({ startSpin, onSpinEnd }: RouletteWheelProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [rotation, setRotation] = useState(0)
	const [iconRotation, setIconRotation] = useState(0)
	const [isSpinning, setIsSpinning] = useState(false)
	const [isAutoSpinning, setIsAutoSpinning] = useState(true)

	// Рисование колеса
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const width = canvas.width
		const height = canvas.height
		const centerX = width / 2
		const centerY = height / 2
		const outerRadius = Math.min(width, height) / 2 - 10
		const segmentOuterRadius = outerRadius * 0.95
		const segmentInnerRadius = outerRadius * 0.64
		const segmentAngle = (2 * Math.PI) / numbers.length
		const borderRadius = segmentOuterRadius * 1.12

		// Clear canvas
		ctx.clearRect(0, 0, width, height)

		// Save context and rotate wheel (против часовой стрелки)
		ctx.save()
		ctx.translate(centerX, centerY)
		ctx.rotate(((rotation + 265) * Math.PI) / 180) // Adjusted to position 0 at the top
		ctx.translate(-centerX, -centerY)

		// Draw outer glow (subtle gradient)
		const gradient = ctx.createRadialGradient(
			centerX, centerY, segmentOuterRadius * 1,
			centerX, centerY, segmentOuterRadius * 1.1
		)
		gradient.addColorStop(1, 'rgba(18, 147, 121, 0)')
		gradient.addColorStop(0, 'rgba(18, 147, 121, 0.3)')

		ctx.beginPath()
		ctx.arc(centerX, centerY, segmentOuterRadius * 1.1, 0, 2 * Math.PI)
		ctx.fillStyle = gradient
		ctx.fill()

		// Draw 3px external border OUTSIDE the gradient
		ctx.beginPath()
		ctx.arc(centerX, centerY, borderRadius, 0, 2 * Math.PI)
		ctx.strokeStyle = '#2C424F'
		ctx.lineWidth = 3
		ctx.stroke()

		// Draw background (inner circle)
		ctx.beginPath()
		ctx.arc(centerX, centerY, segmentOuterRadius, 0, 2 * Math.PI)
		ctx.fillStyle = '#1A2C38'
		ctx.fill()

		// Draw segments
		numbers.forEach((number, index) => {
			const startAngle = index * segmentAngle
			const endAngle = (index + 1) * segmentAngle

			// Determine segment color
			let fillColor = ''
			if (number === 0) {
				fillColor = '#129379' // Green for "0"
			} else if (redNumbers.includes(number)) {
				fillColor = '#FE2247' // Red
			} else {
				fillColor = '#1A2C38' // Black
			}

			// Draw segment
			ctx.beginPath()
			ctx.arc(centerX, centerY, segmentInnerRadius, startAngle, endAngle)
			ctx.arc(centerX, centerY, segmentOuterRadius, endAngle, startAngle, true)
			ctx.closePath()
			ctx.fillStyle = fillColor
			ctx.fill()

			// Add thin separator lines between segments
			ctx.beginPath()
			ctx.moveTo(centerX, centerY)
			ctx.lineTo(
				centerX + Math.cos(startAngle) * segmentOuterRadius,
				centerY + Math.sin(startAngle) * segmentOuterRadius
			)
			ctx.strokeStyle = '#1A2C38'
			ctx.lineWidth = 1
			ctx.stroke()

			// Draw number
			ctx.save()
			ctx.translate(centerX, centerY)
			ctx.rotate(startAngle + segmentAngle / 2)
			ctx.font = 'medium 11px Roboto'
			ctx.fillStyle = '#FFFFFF'
			ctx.textAlign = 'center'
			ctx.textBaseline = 'bottom'
			// Rotate text to be readable from outside
			ctx.rotate(Math.PI / 2)
			ctx.fillText(number.toString(), 0, -(segmentOuterRadius - 25))
			ctx.restore()
		})

		// Draw center circle (larger and simpler)
		ctx.beginPath()
		ctx.arc(centerX, centerY, segmentInnerRadius, 0, 2 * Math.PI)
		ctx.fillStyle = '#071B28'
		ctx.fill()
		ctx.strokeStyle = '#B49A44'
		ctx.lineWidth = 4
		ctx.stroke()

		// Draw background image for the center (вращается вместе с колесом)
		const iconBg = new Image()
		iconBg.src = '/icons/roulette/bg-snake.svg'
		iconBg.onload = () => {
			const bgSize = segmentInnerRadius * 1.5
			ctx.drawImage(
				iconBg,
				centerX - bgSize / 2,
				centerY - bgSize / 2,
				bgSize,
				bgSize
			)
		}

		// Restore context to draw the icon without the wheel's rotation
		ctx.restore()

		// Draw the cross icon with its own rotation (по часовой стрелке)
		const icon = new Image()
		icon.src = '/icons/roulette/goldCross.svg'
		icon.onload = () => {
			const iconSize = 95
			ctx.save()
			ctx.translate(centerX, centerY)
			ctx.rotate((iconRotation * Math.PI) / 180)
			ctx.translate(-centerX, -centerY)
			ctx.drawImage(
				icon,
				centerX - iconSize / 2,
				centerY - iconSize / 2,
				iconSize,
				iconSize
			)
			ctx.restore()
		}
	}, [rotation, iconRotation])

	// Постоянное медленное вращение (автоматическое)
	useEffect(() => {
		if (!isAutoSpinning) return

		let animationFrameId: number
		const rotateWheel = () => {
			setRotation((prevRotation) => (prevRotation - 0.5) % 360) // Колесо вращается против часовой стрелки
			setIconRotation((prevRotation) => (prevRotation + 0.5) % 360) // Иконка вращается по часовой стрелке
			animationFrameId = requestAnimationFrame(rotateWheel)
		}

		rotateWheel()

		// Очистка при размонтировании или остановке
		return () => cancelAnimationFrame(animationFrameId)
	}, [isAutoSpinning])

	// Управление вращением при нажатии кнопки "Start game"
	useEffect(() => {
		if (!startSpin || isSpinning) return

		// Отключаем автоматическое вращение
		setIsAutoSpinning(false)
		setIsSpinning(true)

		// Случайный угол вращения (5-10 полных оборотов + случайный угол)
		const randomSpins = Math.floor(Math.random() * 5) + 5
		const randomAngle = Math.random() * 360
		const finalRotation = rotation + randomSpins * 360 + randomAngle
		const finalIconRotation = iconRotation + randomSpins * 360 + randomAngle

		// Анимация
		let startTime: number | null = null
		const duration = 5000 // 5 секунд

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp
			const progress = (timestamp - startTime) / duration

			if (progress < 1) {
				// Используем затухание для замедления
				const easedProgress = 1 - Math.pow(1 - progress, 3) // Кубическое затухание
				setRotation(rotation + (finalRotation - rotation) * easedProgress * -1) // Против часовой стрелки
				setIconRotation(iconRotation + (finalIconRotation - iconRotation) * easedProgress) // По часовой стрелке
				requestAnimationFrame(animate)
			} else {
				setRotation((finalRotation * -1) % 360) // Против часовой стрелки
				setIconRotation(finalIconRotation % 360) // По часовой стрелке
				setIsSpinning(false)

				// Включаем автоматическое вращение после завершения спина
				setIsAutoSpinning(true)

				// Вызываем onSpinEnd с выигравшим номером
				if (onSpinEnd) {
					const segmentAngle = 360 / numbers.length
					const adjustedRotation = (finalRotation * -1) % 360
					const winningSegment = Math.floor((360 - adjustedRotation) / segmentAngle) % numbers.length
					const winningNumber = numbers[winningSegment]
					onSpinEnd(winningNumber)
				}
			}
		}

		requestAnimationFrame(animate)
	}, [startSpin])

	return (
		<div className="relative flex flex-col items-center">
			<canvas
				ref={canvasRef}
				width={299}
				height={299}
				className="border-0"
			/>
		</div>
	)
}