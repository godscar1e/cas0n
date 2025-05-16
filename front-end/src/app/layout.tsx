// app/layout.tsx
import { Inter } from "next/font/google"
import "./globals.scss"
import Providers from './providers'
import ClientWrapper from '@/app/components/ClientWrapper' // Новый клиентский компонент

const inter = Inter({
  subsets: ['latin'],
})

export const metadata = {
  title: 'WinStar',
  description: 'Your App Description',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased overflow-y-hidden`}>
        <Providers>
          <div className="wrapper">
            <div className="flex w-full overflow-y-hidden">
              <ClientWrapper>{children}</ClientWrapper>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}