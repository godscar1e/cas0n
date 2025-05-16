'use client'

import { Inter } from "next/font/google"
import "../globals.scss"
import { Toaster } from 'sonner'

import ProfileNavBar from '@/app/components/Profile/NavBar'

const inter = Inter({
	subsets: ['latin'],
})

export default function ProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {


	return (
		<div className="wrapper relative max-w-[1249px] w-full mx-auto py-[60px] px-5">
			<ProfileNavBar />
			{children}
		</div>
	)
}
