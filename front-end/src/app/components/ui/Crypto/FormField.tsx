import React from 'react'

type FormFieldProps = {
	children: React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({  children}) => {
	return (
		<div>
			{children}
		</div>
	)
}