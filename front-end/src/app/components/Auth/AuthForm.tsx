// components/Auth/AuthForm.tsx
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Field } from '../ui/Field'
import { Button } from '../ui/Button'
import { IAuthForm } from '@/app/types/auth.types'
import Checkbox from '../ui/checkbox'

interface AuthFormProps {
	isLoginForm: boolean
	onSubmit: SubmitHandler<IAuthForm>
	register: any
	errors: any
	isChecked: boolean
	handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const AuthForm: FC<AuthFormProps> = ({
	isLoginForm,
	onSubmit,
	register,
	errors,
	isChecked,
	handleCheckboxChange,
}) => {
	return (
		<form
			className="max-w-[410px] w-full shadow rounded-xl"
			onSubmit={(e) => {
				e.preventDefault() // Предотвращаем стандартное поведение формы
				onSubmit({
					email: e.currentTarget.email.value,
					password: e.currentTarget.password.value,
					...(isLoginForm
						? {}
						: {
							username: e.currentTarget.username.value,
							referralCode: e.currentTarget.refcode.value,
						}),
				})
			}}
		>
			<div className="mt-10">
				{isLoginForm ? (
					<>
						<Field
							id="email"
							label="Email*"
							placeholder="Enter Email"
							type="email"
							className={`mb-[10px] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
							state={errors.email ? 'error' : 'success'}
							errors={errors}
							{...register('email', {
								required: 'Email is required!',
							})}
						/>
						<Field
							id="password"
							label="Password*"
							placeholder="Enter password"
							type="password"
							className={`mb-[10px] ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
							state={errors.password ? 'error' : 'success'}
							errors={errors}
							{...register('password', {
								required: 'Password is required!',
							})}
						/>
					</>
				) : (
					<>
						<Field
							id="username"
							label="Username*"
							placeholder="Enter Username"
							type="text"
							className={`mb-[10px] ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
							state={errors.username ? 'error' : 'success'}
							errors={errors}
							{...register('username', {
								required: 'Username is required!',
							})}
						/>
						<Field
							id="email"
							label="Email*"
							placeholder="Enter Email"
							type="email"
							className={`mb-[10px] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
							state={errors.email ? 'error' : 'success'}
							errors={errors}
							{...register('email', {
								required: 'Email is required!',
							})}
						/>
						<Field
							id="password"
							label="Password*"
							placeholder="Enter password"
							type="password"
							className={`mb-[10px] ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
							state={errors.password ? 'error' : 'success'}
							errors={errors}
							{...register('password', {
								required: 'Password is required!',
							})}
						/>
						<Checkbox
							onChange={handleCheckboxChange}
							checked={isChecked}
							label="I agree to the Terms & Conditions and Privacy Policy"
						/>
						<Field
							id="refcode"
							label="Referral Code (Optional)"
							placeholder="Enter code"
							type="text" // Изменил type="code" на "text"
							extra="mt-6"
							{...register('referralCode')}
						/>
					</>
				)}
				<div className="flex items-center mt-10 gap-5 justify-center font-light">
					<Button>{isLoginForm ? 'Login' : 'Register'}</Button>
				</div>
			</div>
		</form>
	)
}