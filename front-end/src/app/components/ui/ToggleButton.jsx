'use client'
import { useState } from 'react'

export default function ToggleSwitch() {
	const [isOn, setIsOn] = useState(false)

	return (
		<div
			className={`w-[42px] h-[22px] flex items-center bg-primary rounded-full p-[2px] cursor-pointer transition`}
			onClick={() => setIsOn(!isOn)}
		>
			<div
				className={`w-[18px] h-[18px] bg-bageColor rounded-full shadow-md transform transition ${isOn ? 'translate-x-5' : ''
					}`}
			/>
		</div>
	)
}
