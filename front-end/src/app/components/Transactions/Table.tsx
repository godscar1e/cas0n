'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

interface Column {
	key: string
	label: string
}

interface DynamicTableProps {
	tableName: string
}

const tableConfigs: Record<string, Column[]> = {
	deposits: [
		{ key: 'createdAt', label: 'Date' },
		{ key: 'amount', label: 'Amount' },
		{ key: 'status', label: 'Status' },
	],
	withdrawals: [
		{ key: 'createdAt', label: 'Date' },
		{ key: 'amount', label: 'Amount' },
		{ key: 'transactionId', label: 'Transaction ID' },
		{ key: 'status', label: 'Status' },
	],
	casinobets: [
		{ key: 'game', label: 'Game' },
		{ key: 'createdAt', label: 'Date' },
		{ key: 'amount', label: 'Amount' },
		{ key: 'multiplier', label: 'Multiplier' },
		{ key: 'betId', label: 'Bet ID' },
	],
	tipnrain: [
		{ key: 'type', label: 'Type' },
		{ key: 'userId', label: 'User' },
		{ key: 'createdAt', label: 'Date' },
		{ key: 'amount', label: 'Amount' },
	],
	other: [
		{ key: 'type', label: 'Type' },
		{ key: 'createdAt', label: 'Date' },
		{ key: 'amount', label: 'Amount' },
		{ key: 'status', label: 'Status' },
	],
}

const formatDate = (dateString: string): string => {
	return format(new Date(dateString), 'MMM d, yyyy h:mm a')
}

const formatTransactionId = (txId: string): string => {
	if (!txId || txId.length < 8) return txId // Если строка слишком короткая, возвращаем как есть
	return `${txId.slice(0, 4)}...${txId.slice(-4)}`
}

export default function DynamicTable({ tableName }: DynamicTableProps) {
	const [data, setData] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			console.log(`Fetching data for table: ${tableName}`)
			try {
				setLoading(true)
				setError(null)
				const response = await fetch(`/api/table?table=${tableName}`)
				console.log('Response received:', response.status)

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const contentType = response.headers.get('content-type')
				if (!contentType || !contentType.includes('application/json')) {
					const text = await response.text()
					throw new Error(`Expected JSON, got ${contentType}: ${text}`)
				}

				const result = await response.json()
				console.log('Data received:', result)
				setData(result)
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : String(error)
				console.error('Error fetching data:', errorMessage)
				setError(errorMessage)
			} finally {
				console.log('Fetch completed, setting loading to false')
				setLoading(false)
			}
		}

		fetchData()
	}, [tableName])

	if (loading) return <div>Загрузка...</div>
	if (error) return <div>Ошибка: {error}</div>
	if (!tableConfigs[tableName]) return <div>Таблица не найдена</div>

	const columns = tableConfigs[tableName]

	return (
		<div className="overflow-x-auto mt-10">
			<table className="w-full table-fixed border-separate border-spacing-0">
				<thead>
					<tr>
						{columns.map((column) => (
							<th
								key={column.key}
								className="border-b border-primary px-5 pb-[5px] bg-transparent text-lg font-normal text-checkboxColor text-left w-1/5"
							>
								<div className="flex items-center gap-2">{column.label}</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr
							key={index}
							className={`h-[49px] text-base font-light ${index % 2 === 1 ? 'bg-primary' : ''}`}
						>
							{columns.map((column, colIndex) => (
								<td
									key={column.key}
									className={`px-5 w-1/5 ${index % 2 === 1
										? colIndex === 0
											? 'rounded-l-[5px]'
											: colIndex === columns.length - 1
												? 'rounded-r-[5px]'
												: ''
										: ''
										}`}
								>
									{column.key === 'createdAt' ? (
										formatDate(row[column.key])
									) : column.key === 'status' ? (
										tableName === 'deposits' ? (
											row[column.key] === 'Confirmed' ? (
												<div className="flex gap-[10px] items-center">
													<Link
														href={`/${tableName}/${column.key}`}
														className="text-gray-500 hover:text-gray-700"
													>
														<Image
															src="/icons/transactions/chain.svg"
															width={18}
															height={9}
															alt=""
														/>
													</Link>
													<span className="text-emerald">{row[column.key]}</span>
												</div>
											) : row[column.key] === 'Pending' ? (
												<div className="flex gap-[10px] items-center">
													<Link
														href={`/${tableName}/${column.key}`}
														className="text-gray-500 hover:text-gray-700"
													>
														<Image
															src="/icons/transactions/chain.svg"
															width={18}
															height={9}
															alt=""
														/>
													</Link>
													<span className="text-bronze">{row[column.key]}</span>
												</div>
											) : row[column.key] === 'Cancelled' ? (
												<div className="flex gap-[10px] items-center">
													<Link
														href={`/${tableName}/${column.key}`}
														className="text-gray-500 hover:text-gray-700"
													>
														<Image
															src="/icons/transactions/chain.svg"
															width={18}
															height={9}
															alt=""
														/>
													</Link>
													<span className="text-redColor">{row[column.key]}</span>
												</div>
											) : (
												row[column.key]
											)
										) : (
											row[column.key] === 'Confirmed' ? (
												<span className="text-emerald">{row[column.key]}</span>
											) : row[column.key] === 'Pending' ? (
												<span className="text-bronze">{row[column.key]}</span>
											) : row[column.key] === 'Cancelled' ? (
												<span className="text-redColor">{row[column.key]}</span>
											) : (
												row[column.key]
											)
										)
									) : column.key === 'amount' ? (
										`+$${row[column.key]}`
									) : column.key === 'transactionId' ? (
										<Link
											href={`https://etherscan.io/tx/${row[column.key]}`}
											target="_blank"
											rel="noopener noreferrer"
											className="flex gap-[10px] underline"
										>
											<Image src="/icons/transactions/chain.svg" width={18} height={9} alt="" />
											{formatTransactionId(row[column.key])}
										</Link>
									) : (
										row[column.key]
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}