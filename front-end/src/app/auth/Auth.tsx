// components/Auth/Auth.tsx
import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import Image from 'next/image'
import { authService } from '@/app/services/auth.service'
import { IAuthForm } from '@/app/types/auth.types'
import { TabSwitcher } from '../components/Auth/TabSwitcher'
import { SocialLoginButtons } from '../components/Auth/SocialLoginButtons'
import { AuthForm } from '../components/Auth/AuthForm'
import { SubmitHandler, useForm } from 'react-hook-form'

export const Auth = ({ closeModal }: { closeModal: () => void }) => {
	const [isLoginForm, setIsLoginForm] = useState(true)
	const [isChecked, setIsChecked] = useState(false)
	const [formKey, setFormKey] = useState(0)

	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		formState: { errors },
	} = useForm<IAuthForm>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			username: '',
			password: '',
			referralCode: '',
		},
	})

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			closeModal()
			toast.success('Successfully logged in!')
			setTimeout(() => {
				window.location.reload()
			}, 1000)
		},
		onError(error: any) {
			console.log('Full error:', error.response?.data) // Логируем полный ответ
			toast.error(`Authentication failed: ${error.response?.data?.message || error.message}`)
		},
	})

	const onSubmit: SubmitHandler<IAuthForm> = (data) => {
		const formData = isLoginForm
			? { email: data.email, password: data.password }
			: { ...data, username: data.username || undefined, referralCode: data.referralCode || undefined }
		console.log('Sending data:', formData)
		mutate(formData)
	}

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(event.target.checked)
	}

	const setTab = (tab: 'login' | 'register') => {
		if (isLoginForm === (tab === 'login')) return
		setIsLoginForm(tab === 'login')
		setFormKey((prevKey) => prevKey + 1)
	}

	useEffect(() => {
		reset({
			email: '',
			password: '',
			username: isLoginForm ? '' : '',
			referralCode: isLoginForm ? '' : '',
		})
		clearErrors()
	}, [isLoginForm, reset, clearErrors])

	return (
		<div className="flex justify-between gap-5 max-w-[980px] w-full h-[823px] m-auto bg-secondBlue rounded-[15px]">
			<Image
				className="max-w-[450px] w-full h-[823px] rounded-l-[15px]"
				src="/image.png"
				width={450}
				height={823}
				alt=""
			/>
			<div className="max-w-[530px] mx-auto w-full py-[60px] pr-5">
				<div className="max-w-[410px] w-full mx-auto">
					<TabSwitcher isLoginForm={isLoginForm} setTab={setTab} />
					<div className="mx-auto">
						<AuthForm
							isLoginForm={isLoginForm}
							onSubmit={onSubmit} // Передаём onSubmit напрямую
							register={register}
							errors={errors}
							isChecked={isChecked}
							handleCheckboxChange={handleCheckboxChange}
						/>
						<SocialLoginButtons />
					</div>
				</div>
			</div>
		</div>
	)
}