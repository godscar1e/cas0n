'use client'

import { useEffect, useState } from 'react'
import { fetchUserSessions } from '../../../utils/api/fetchUserSessions'

export default function SessionList({ token }) {
	const [sessions, setSessions] = useState([])

	useEffect(() => {
		const loadSessions = async () => {
			try {
				const data = await fetchUserSessions(token)
				setSessions(data)
			} catch (error) {
				console.error('Error loading sessions:', error)
			}
		}
		loadSessions()
	}, [token])

	return (
		<div>
			<h2>Активные сессии</h2>
			<ul>
				{sessions.map(session => (
					<li key={session.id}>
						<strong>Устройство:</strong> {session.device} <br />
						<strong>IP:</strong> {session.ipAddress} <br />
						<strong>Создано:</strong> {new Date(session.createdAt).toLocaleString()}
					</li>
				))}
			</ul>
		</div>
	)
}


