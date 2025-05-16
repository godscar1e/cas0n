declare module 'sonner' {
	interface ToasterProps {
		limit?: number
		position?: string
		visibleToasts?: number
		richColors?: boolean
		duration?: number
		toastOptions?: {
			style?: React.CSSProperties
		}
	}
	export const Toaster: React.FC<ToasterProps>
	export const toast: any
}