import { userService } from '../services/user.service'
import { useQuery } from '@tanstack/react-query'

export function useUsers() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			return await userService.getAll()
		}
	})

	return { data, isLoading, isError }
}
