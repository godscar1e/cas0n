import { type ChangeEventHandler, forwardRef, InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	extra?: string
	errors?: Record<string, { message?: string }>
	state?: 'error' | 'success'
	isNumber?: boolean
	className?: string
	[key: string]: any
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(({
	label,
	id,
	extra,
	type,
	placeholder,
	state,
	disabled,
	isNumber,
	errors,
	className, // добавим обработку className
	...rest
}, ref) => {
	const errorMessage = errors?.[id]?.message
	return (
		<div className={`${extra}`}>
			<div className="flex justify-between">
				<label htmlFor={id} className="ml-[10px] text-[18px] font-light text-mainwhite">
					{label}
				</label>
				{/* Error message next to the label */}
				{errorMessage && (
					<div className="self-end text-redColor text-sm font-light">
						{errorMessage}
					</div>
				)}
			</div>

			<input
				ref={ref}
				disabled={disabled}
				type={type}
				id={id}
				placeholder={placeholder}
				className={`mt-[10px] flex w-full h-[49px] items-center justify-center rounded-[5px] bg-primary drop-shadow-custom-black p-3 text-base font-light outline-none placeholder:text-placeholder duration-500
    ${state === 'error' ? 'border-1 border-redColor' : 'border-1 border-transparent'} // Устанавливаем одинаковую ширину обводки
    focus:border-secondary focus:ring-0 // Убираем кольцо фокуса и используем border для фокуса
    ${className}`} // Применяем класс для кастомизации
				onKeyDown={(event) => {
					if (
						isNumber &&
						!/[0-9]/.test(event.key) &&
						event.key !== 'Backspace' &&
						event.key !== 'Tab' &&
						event.key !== 'Enter' &&
						event.key !== 'ArrowLeft' &&
						event.key !== 'ArrowRight'
					) {
						event.preventDefault()
					}
				}}
				{...rest}
			/>

		</div>
	)
})

Field.displayName = 'Field'
