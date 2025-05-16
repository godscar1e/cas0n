'use client'

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client' // Импортируем тип Socket
import { useProfile } from '@/app/hooks/useProfile'

const SocketComponent = () => {
	const { data, isLoading } = useProfile() // Получаем данные пользователя
	// console.log('useProfile data in component:', data) // Логируем данные в компоненте

	// if (error) {
	// 	return <div>Error loading profile</div> // Показываем ошибку, если что-то пошло не так
	// }

	const [socket, setSocket] = useState<Socket | null>(null) // Указываем тип Socket
	// console.log('data?.user?.id:', data?.user?.id) // Логируем user.id

	useEffect(() => {
		if (data?.user?.id) {
			// console.log('Connecting with userId:', data.user.id)
			const newSocket = io('http://localhost:4200', {
				withCredentials: true,
				transports: ['websocket'],
			})

			newSocket.on('connect', () => {
				// console.log('Connected to server')
				// console.log('Sending setUser event with ID:', data.user.id)

				// Отправляем событие с userId при подключении
				newSocket.emit('setUser', data.user.id, (response: any) => {
					console.log('Server acknowledged setUser event:', response)
				})
			})

			setSocket(newSocket)

			return () => {
				newSocket.disconnect()
			}
		}
	}, [data])


	if (isLoading) {
		// return <div>Loading...</div>
	} // Показать загрузку, если данные загружаются

	// return <div>Socket Connection: {socket ? 'Connected' : 'Disconnected'}</div> // Показываем состояние соединения
}

export default SocketComponent
