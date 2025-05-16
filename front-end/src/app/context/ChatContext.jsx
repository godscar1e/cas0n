import { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
	const [isChatOpen, setIsChatOpen] = useState(true)

	return (
		<ChatContext.Provider value={{ isChatOpen, setIsChatOpen }}>
			{children}
		</ChatContext.Provider>
	)
}

export const useChat = () => useContext(ChatContext)
