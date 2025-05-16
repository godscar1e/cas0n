'use client'

import DynamicTable from '@/app/components/Transactions/Table'
import { useState } from 'react'

export default function DepositComp() {
	const [selectedTable, setSelectedTable] = useState('deposits')
	return (
		<div className="">
			<DynamicTable tableName={selectedTable} />
		</div>
	)
}
