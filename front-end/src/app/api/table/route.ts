import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const table = searchParams.get('table')
	const userId = searchParams.get('userId')

	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4200'

	try {
		const url = userId
			? `${backendUrl}/api/table?table=${table}&userId=${userId}`
			: `${backendUrl}/api/table?table=${table}`
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`Backend error: ${response.status}`)
		}
		const data = await response.json()
		return NextResponse.json(data)
	} catch (error) {
		// Приведение error к типу Error или безопасная обработка
		const errorMessage = error instanceof Error ? error.message : String(error)
		return NextResponse.json({ error: errorMessage }, { status: 500 })
	}
}