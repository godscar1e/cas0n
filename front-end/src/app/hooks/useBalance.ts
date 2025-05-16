import { balanceService } from '@/app/services/balance.service'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

export function useBalance() {
	const accessToken = Cookies.get('accessToken')
	const isAuthenticated = !!accessToken

	const { data, isLoading } = useQuery({
		queryKey: ['balance', accessToken], // Добавляем токен в queryKey
		queryFn: () => balanceService.getBalance(),
		enabled: isAuthenticated,
		refetchInterval: isAuthenticated ? 10000 : false,
	})

	return { balance: data, isBalanceLoading: isLoading }
}