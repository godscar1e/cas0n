export const fetchUserSessions = async (token) => {
	const res = await fetch('/api/sessions', {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	})

	if (!res.ok) throw new Error('Failed to fetch sessions')
	return res.json()
};
