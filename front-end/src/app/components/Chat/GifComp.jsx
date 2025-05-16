import React, { useState } from 'react'

const GifPicker = ({ onGifSelect }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [gifs, setGifs] = useState([])

	// Функция поиска GIF через Giphy API
	const fetchGifs = async () => {
		const apiKey = 'OOGeIVCeIoRHh11qiWt81yKHJuwtS7Jl' // Замените на ваш API ключ
		const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=10`

		try {
			const response = await fetch(url)
			const data = await response.json()
			setGifs(data.data) // Сохраняем GIF в состояние
		} catch (error) {
			console.error('Error fetching GIFs:', error)
		}
	}

	return (
		<div className="gif-picker">
			{/* Поле для ввода поиска */}
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search for GIFs"
				className='text-black'
			/>
			<button onClick={fetchGifs}>Search</button>

			{/* Список GIF */}
			<div className="gif-list">
				{gifs.map((gif) => (
					<img
						key={gif.id}
						src={gif.images.fixed_height.url}
						alt={gif.title}
						onClick={() => onGifSelect(gif.images.fixed_height.url)} // Выбираем GIF
						style={{ cursor: 'pointer', margin: '5px', width: '246px', height: '250px' }}
					/>
				))}
			</div>
		</div>
	)
}

export default GifPicker
