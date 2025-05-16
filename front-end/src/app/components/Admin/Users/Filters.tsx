'use client'

import { useState } from 'react'

interface FiltersProps {
	onSearch: (query: string) => void
	onFilterChange: (filters: string[]) => void
}

export default function Filters({ onSearch, onFilterChange }: FiltersProps) {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedFilters, setSelectedFilters] = useState<string[]>([])

	// Опции для фильтрации по ролям
	const roleFilterOptions = ['Active Users', 'Inactive Users', 'Admins', 'Moderators']

	// Обновляем строку поиска
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value
		setSearchQuery(query)
		onSearch(query)
	}

	// Обновляем выбранные фильтры
	const handleFilterChange = (filter: string) => {
		const updatedFilters = selectedFilters.includes(filter)
			? selectedFilters.filter((f) => f !== filter) // Убираем фильтр
			: [...selectedFilters, filter] // Добавляем фильтр

		setSelectedFilters(updatedFilters)
		onFilterChange(updatedFilters)
	}

	return (
		<div className="mb-4 flex justify-between gap-5">
			<div className="mb-4 max-w-[492px] w-full">
				<input
					type="text"
					className="border border-placeholder p-2 w-full rounded-[5px] text-mainwhite bg-primary outline-none"
					value={searchQuery}
					onChange={handleSearchChange}
				/>
			</div>
			<div className="flex flex-wrap justify-between gap-3 max-w-[848px] w-full ">
				{roleFilterOptions.map((filter) => (
					<label key={filter} className="flex items-center gap-5">
						<div className="relative w-[22px] h-[22px]">
							<input
								type="checkbox"
								className="w-[22px] h-[22px] appearance-none border border-checkboxColor rounded-[5px]"
								checked={selectedFilters.includes(filter)}
								onChange={() => handleFilterChange(filter)}
							/>
							{/* Визуализация квадрата внутри чекбокса */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div
									className={`w-[14px] h-[14px] bg-mainwhite rounded-[5px] transition-opacity duration-200 ${selectedFilters.includes(filter)
										? 'opacity-100'
										: 'opacity-0'
										}`}
								></div>
							</div>
						</div>
						<span className="text-mainwhite">{filter}</span>
					</label>
				))}
			</div>
		</div>
	)
}
