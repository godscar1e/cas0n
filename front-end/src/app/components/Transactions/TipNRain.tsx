'use client'

import DynamicTable from '@/app/components/Transactions/Table'
import { useState } from 'react'

export default function TipNRainComp() {
	const [selectedTable, setSelectedTable] = useState('tipnrain')
	return (
		<div className="">
			<DynamicTable tableName={selectedTable} />
		</div>
	)
}
