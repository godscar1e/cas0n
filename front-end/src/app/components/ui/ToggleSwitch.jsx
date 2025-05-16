'use client'
import { useState } from 'react'

export default function ToggleSwitch({ width = 53, height = 30, isOn = false, onToggle }) {
	// Calculate knob size and translation dynamically
	const knobSize = height - 6
	const translateX = isOn ? width - knobSize - 4 : 0

	return (
		<div
			style={{ width: `${width}px`, height: `${height}px` }}
			className={`flex items-center bg-bageColor rounded-full p-[2px] cursor-pointer transition ${isOn ? 'bg-secondary' : ''}`}
			onClick={onToggle}
		>
			<div
				style={{
					width: `${knobSize}px`,
					height: `${knobSize}px`,
					transform: `translateX(${translateX}px)`,
				}}
				className="bg-mainwhite rounded-full shadow-md transition"
			/>
		</div>
	)
}