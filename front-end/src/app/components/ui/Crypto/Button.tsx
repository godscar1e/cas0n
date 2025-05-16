import React from 'react'

type ButtonVariant = 'primary' | 'success' | 'warning' | 'danger' | 'secondary'

type ButtonProps = {
	children: React.ReactNode
	variant?: ButtonVariant
	type?: 'button' | 'submit' | 'reset'
	fullWidth?: boolean
	onClick?: () => void
	disabled?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
	primary: 'bg-blue-600 hover:bg-blue-700',
	success: 'bg-teal-600 hover:bg-teal-700',
	warning: 'bg-amber-600 hover:bg-amber-700',
	danger: 'bg-red-600 hover:bg-red-700',
	secondary: 'bg-gray-600 hover:bg-gray-700'
}

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	type = 'button',
	fullWidth = false,
	onClick,
	disabled = false
}) => {
	return (
		<button
			type={type}
			className={`${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} h-[60px] p-2 mt-5 rounded-[5px] text-2xl font-normal transition-colors duration-200 disabled:opacity-50`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}