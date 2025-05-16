'use client'

import { useState } from 'react'
import Filters from '@/app/components/Admin/Users/Filters'
import UsersTable from '@/app/components/Admin/Users/UsersTable'
import { useUsers } from '@/app/hooks/useUsers'
import { userService } from '@/app/services/user.service'
import { useQuery } from '@tanstack/react-query'

export default function UsersPage() {
	const { data: users, isLoading, isError, refetch } = useQuery({
		queryKey: ['users'],
		queryFn: async () => await userService.getAll(),
		refetchOnWindowFocus: true, 
	})

	console.log('users: ', users)
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedFilters, setSelectedFilters] = useState<string[]>([])

	if (isLoading) {
		// return <div>Loading...</div>
	}

	if (isError || !users) {
		return <div>Error loading users</div>
	}

	// Убедитесь, что users - это массив
	const usersArray = Array.isArray(users) ? users : Object.values(users)

	// Логика фильтрации
	const filteredUsers = usersArray.filter((user: any) => {
		const queryMatch =
			user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.id?.toLowerCase().includes(searchQuery.toLowerCase())

		const roleMatch =
			selectedFilters.length === 0 ||
			selectedFilters.some((filter) => {
				if (filter === 'Active Users') return user.status === 'Active'
				if (filter === 'Inactive Users') return user.status === 'Inactive'
				if (filter === 'Admins') return user.role === 'Admin'
				if (filter === 'Moderators') return user.role === 'Moderator'
				return false
			})

		return queryMatch && roleMatch
	})

	return (
		<div className="mt-11 px-5 max-w-[1408px] w-full mx-auto">
			<Filters onSearch={setSearchQuery} onFilterChange={setSelectedFilters} />
			<UsersTable users={filteredUsers} />
		</div>
	)
}
