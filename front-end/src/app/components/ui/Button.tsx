import cn from 'clsx'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'


type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
	children,
	className,
	...rest
}: PropsWithChildren<TypeButton>) {
	return (
		<button className={cn(
			'w-full h-[54px] rounded-[5px] bg-secondary text-mainwhite text-[20px] font-medium drop-shadow-custom-black outline-none',
			className
		)}
			{...rest}
		>
			{children}
		</button>
	)
}
