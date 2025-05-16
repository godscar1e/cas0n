import { NextRequest, NextResponse } from 'next/server'
import { EnumTokens } from './app/services/auth-token.service'
import { DASHBOARD_PAGES } from './app/config/pages-url.config'

export async function middleware(request: NextRequest) {
	const { url, cookies } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isDashboardPage = Object.values(DASHBOARD_PAGES).some(page => url.includes(page))
	const isAuthPage = url.includes('/auth')

	// Если пользователь попал на страницу dashboard и у него нет доступа, перенаправляем на 404
	if (isDashboardPage) {
		// return NextResponse.rewrite(new URL('/404', request.url))
	}

	// Если пользователь на странице /auth и уже авторизован
	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
	}

	// Если пользователь на странице /auth
	if (isAuthPage) {
		return NextResponse.next()
	}

	// Если пользователь не авторизован, перенаправляем на /auth
	// if (!refreshToken) {
	// 	return NextResponse.redirect(new URL('/auth', request.url))
	// }

	return NextResponse.next()
}

export const config = {
	matcher: ['/:path*', '/auth/:path*']
}
