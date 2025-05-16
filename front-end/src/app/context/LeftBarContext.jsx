import { createContext, useContext, useState } from 'react'

const LeftBarContext = createContext()

export const LeftBarProvider = ({ children }) => {
	const [isLeftBarOpen, setIsLeftBarOpen] = useState(true)

	return (
		<LeftBarContext.Provider value={{ isLeftBarOpen, setIsLeftBarOpen }}>
			{children}
		</LeftBarContext.Provider>
	)
}

export const useLeftBar = () => useContext(LeftBarContext)
