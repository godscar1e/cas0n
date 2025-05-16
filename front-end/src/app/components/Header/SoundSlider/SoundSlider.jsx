'use client'

import './SoundSlider.scss'

import { useState, useEffect, useRef } from 'react'

export default function Slider() {
	const [value, setValue] = useState(50) // Начальное значение
	const sliderRef = useRef(null)

	const updateSlider = (newValue) => {
		setValue(newValue)
		if (sliderRef.current) {
			sliderRef.current.style.setProperty('--slider-percentage', `${newValue}%`)
		}
	}

	useEffect(() => {
		if (sliderRef.current) {
			sliderRef.current.style.setProperty('--slider-percentage', `${value}%`)
		}
	}, [])

	return (
		<div className="max-w-[67px] w-full mt-[-2px]">
			<input
				type="range"
				min="0"
				max="100"
				value={value}
				onChange={(e) => updateSlider(e.target.value)}
				className="custom-slider w-full h-1 rounded-full cursor-pointer"
				ref={sliderRef}
			/>
		</div>
	)
}