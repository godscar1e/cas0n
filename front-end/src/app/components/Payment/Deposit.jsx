import { useState } from 'react'
import axios from 'axios'

export default function Deposit() {
	const [amount, setAmount] = useState('')

	const handleDeposit = async () => {
		try {
			const response = await axios.post('/api/payments/create-deposit', {
				amount: amount,
				currency: 'USD',
			})
			window.open(response.data.paymentUrl, '_blank')
		} catch (error) {
			console.error('Ошибка инициации депозита', error)
		}
	}

	return (
		<div>
			<input
				type="number"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				placeholder="Введите сумму депозита"
			/>
			<button onClick={handleDeposit}>Депозит</button>
		</div>
	)
}