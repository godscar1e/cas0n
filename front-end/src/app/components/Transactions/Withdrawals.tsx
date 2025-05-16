'use client'

import DynamicTable from '@/app/components/Transactions/Table'
import { useState } from 'react'

export default function WithdrawalsComp() {
	const [selectedTable, setSelectedTable] = useState('withdrawals')
	return (
		<div className="">
			<DynamicTable tableName={selectedTable} />
		</div>
	)
}
