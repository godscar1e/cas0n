import RouletteNumberService from '@/app/services/roulettespin-number'
import { useQuery } from '@tanstack/react-query'

export function usePrevSpins() {
	const { data = [], isLoading } = useQuery({
		queryKey: ['spins'],
		queryFn: () => RouletteNumberService.getAllSpinNumbers()
	})
	return { data, isLoading }
}
