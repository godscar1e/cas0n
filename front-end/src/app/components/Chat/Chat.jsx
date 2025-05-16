import { useEffect, useState } from 'react'
// import Cookies from 'js-cookie'
import io from 'socket.io-client'
import axios from 'axios'
import EmojiPicker from 'emoji-picker-react'
import GifPicker from './GifComp'
import Image from 'next/image'
import { useChat } from '@/app/context/ChatContext'
import { useProfile } from '@/app/hooks/useProfile'

const socket = io('http://localhost:4200')

const Chat = () => {
	const { isChatOpen, setIsChatOpen } = useChat()
	const { data: profileData, isLoading } = useProfile()
	const [messages, setMessages] = useState([])
	const [users, setUsers] = useState([])
	const [input, setInput] = useState('')
	const [isPickerVisible, setIsPickerVisible] = useState(false)
	const [isGifPickerVisible, setIsGifPickerVisible] = useState(false)

	// Функция для добавления эмодзи в текстовое поле
	const onEmojiClick = (emojiData) => {
		setInput((prev) => prev + emojiData.emoji) // emojiData содержит выбранный эмодзи
	}

	const toggleEmojiPicker = () => {
		setIsPickerVisible((prev) => !prev)
	}

	const sendGif = (gifUrl) => {
		setMessages((prev) => [...prev, { type: 'gif', content: gifUrl }])
		setIsGifPickerVisible(false) // Закрываем окно выбора GIF
	}

	// Загружаем всех пользователей
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { data } = await axios.get('http://localhost:4200/api/user/profile/all') // Замените URL на ваш эндпоинт
				setUsers(data)
			} catch (error) {
				console.error('Failed to fetch users:', error)
			}
		}

		fetchUsers()
	}, [])

	// Загружаем сообщения и подписываемся на обновления
	useEffect(() => {
		socket.emit('loadMessages')

		socket.on('loadMessages', (loadedMessages) => {
			console.log('Loaded messages:', loadedMessages)
			// Преобразуем поле `message` в `textmessage`
			const normalizedMessages = loadedMessages.map((msg) => ({
				...msg,
				textmessage: msg.message, // Преобразуем `message` в `textmessage`
			}))
			setMessages(normalizedMessages)
		})

		socket.on('receiveMessage', (message) => {
			console.log('Message received:', message)
			// Преобразуем поле `message` в `textmessage` перед добавлением
			const normalizedMessage = {
				...message,
				textmessage: message.textmessage,
			}
			setMessages((prevMessages) => {
				if (!prevMessages.some((msg) => msg.createdAt === normalizedMessage.createdAt && msg.textmessage === normalizedMessage.textmessage)) {
					return [...prevMessages, normalizedMessage]
				}
				return prevMessages
			})
		})

		return () => {
			socket.off('loadMessages')
			socket.off('receiveMessage')
		}
	}, [])



	// Отправка сообщения
	const sendMessage = () => {
		if (profileData?.user?.id) {
			if (input.trim()) {
				const message = {
					sender: profileData.user.id,
					username: profileData.user.username,
					textmessage: input,
					createdAt: new Date().toISOString(), // Добавляем дату
				}

				console.log('Sending message:', message)
				socket.emit('sendMessage', message) // Отправляем только через сокет
				setMessages((prevMessages) => [...prevMessages, message]) // Добавляем сообщение в состояние
				setInput('') // Очищаем поле ввода
			}
		} else {
			console.log('User is not authenticated!')
		}
	}

	// Получение имени пользователя по userId
	const getUserName = (userId) => {
		const user = users.find((user) => user.id === userId) // Замените "id" на ваше поле идентификатора
		return user ? user.username : 'Unknown User'
	}

	return (
		<div
			className={`max-w-0 h-[100vh] xl:max-w-[287px] bg-secondBlue transition-all duration-500 ease-in-out ${isChatOpen ? 'w-full' : 'w-0 overflow-hidden'
				}`}
		>

			<div style={{
				boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
			}} className='max-w-[325px] w-full h-[80px] py-8 px-5'>
				<button
					onClick={() => setIsChatOpen((prev) => !prev)}
					className={`text-white mb-2`}
				>
					<Image src='/icons/chat_icons/open_close-ico.svg' width={27} height={16} alt='' />
				</button>
			</div>
			<div className="h-[calc(100vh-120px)] px-5 flex flex-col">

				<div className='relative flex flex-col gap-[15px] max-h-[600px] py-5 overflow-y-scroll scrollbar-hidden'>
					{messages.map((msg, index) => (
						<div key={index}>
							<div className="flex justify-between h-10">
								<p className='uppercase'>{msg.username}</p>
								<p className='text-placeholder'>
									{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
								</p>
							</div>
							<div className='pl-[10px] py-[10px] mt-[5px] bg-bageColor drop-shadow-custom-black rounded-[5px]'>
								<div className="absolute top-0 left-4 w-2 h-2 bg-bageColor transform rotate-45 -translate-y-1/2"></div>
								<p className='text-sm font-medium'>{msg.textmessage}</p>
							</div>
						</div>
					))}
					<div className="absolute bottom-0">
						{isPickerVisible && (
							<div className="emoji-picker">
								<EmojiPicker height={500} width={246} onEmojiClick={onEmojiClick} />
							</div>
						)}
					</div>
				</div>
				<div className='relative w-[246px] h-[95px] mt-auto'>
					<textarea
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type your message..."
						className='w-full h-[95px] border border-bageColor bg-transparent rounded-[5px] outline-none p-2 resize-none'
						rows={4}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault() // Предотвращаем перенос строки
								sendMessage()
							}
						}}
					/>
					<div className="absolute max-w-[286px] w-full px-[10px] flex justify-between bottom-[10px]">
						<div className="">
							<button onClick={toggleEmojiPicker}>
								<Image src='/icons/chat_icons/emoji-ico.svg' width={20} height={20} alt='' />
							</button>
							{/* <GifPicker onGifSelect={sendGif} /> */}
						</div>
						<button onClick={sendMessage} className='w-5 h-5 right-3'>
							<Image src='/icons/chat_icons/send-ico.svg' width={20} height={20} alt='' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Chat
