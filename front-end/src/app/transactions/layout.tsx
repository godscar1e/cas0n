import { Inter } from "next/font/google"
import "../globals.scss"
import { Toaster } from 'sonner'

import TransactionsNavbar from '@/app/components/Transactions/TransactionsNavbar'


const inter = Inter({
	subsets: ['latin'],
})

export default function ProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {


	return (
		<div className="wrapper relative p-[60px]">
				<TransactionsNavbar />
			{children}
		</div>
	)
}
