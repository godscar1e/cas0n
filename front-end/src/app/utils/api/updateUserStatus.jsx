export const fetcher = async (url) => {
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error('Failed to fetch data')
	}
	return response.json()
}

// Функция для обновления статуса пользователя
export const updateUserStatus = async (userId, newStatus) => {
	const response = await fetch(`/api/users/${userId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ status: newStatus }),
	})

	if (!response.ok) {
		throw new Error('Failed to update user status')
	}

	return response.json()
}