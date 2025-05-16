const cryptoIcons = ['bitcoin', 'ethereum', 'solana', 'litecoin'] as const
type CryptoIcon = typeof cryptoIcons[number]

export const currencyOptions = [
	{ value: 'bitcoin', label: 'Bitcoin', icon: 'bitcoin' as CryptoIcon },
	{ value: 'ethereum', label: 'Ethereum', icon: 'ethereum' as CryptoIcon },
	{ value: 'solana', label: 'Solana', icon: 'solana' as CryptoIcon },
	{ value: 'litecoin', label: 'Litecoin', icon: 'litecoin' as CryptoIcon }
]