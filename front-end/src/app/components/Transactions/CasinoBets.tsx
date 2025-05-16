'use client'

import DynamicTable from '@/app/components/Transactions/Table'
import { useState } from 'react'

export default function CasinoBetsComp() {
	const [selectedTable, setSelectedTable] = useState('casinobets')
	return (
		<div className="">
			<DynamicTable tableName={selectedTable} />
		</div>
	)
}
