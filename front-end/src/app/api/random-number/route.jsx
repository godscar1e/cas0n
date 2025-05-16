// src/app/api/random-number/route.jsx

export async function POST(req) {
	const apiKey = '75ebe3d7-8683-4527-bb84-efcc7227b2b0' // Ваш API ключ random.org

	try {
		// Делаете запрос к random.org для получения случайного числа
		const response = await fetch('https://api.random.org/json-rpc/4/invoke', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				jsonrpc: '2.0',
				method: 'generateIntegers',
				params: {
					apiKey,
					n: 1,
					min: 0,
					max: 36,
					replacement: true,
				},
				id: 42,
			}),
		})

		const data = await response.json()

		if (data.error) {
			return new Response(
				JSON.stringify({ error: data.error.message }),
				{ status: 500 }
			)
		}

		return new Response(
			JSON.stringify({ number: data.result.random.data[0] }),
			{ status: 200 }
		)
	} catch (error) {
		return new Response(
			JSON.stringify({ error: 'Не удалось получить данные от random.org.' }),
			{ status: 500 }
		)
	}
}
