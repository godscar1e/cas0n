'use client'

import React, { useState } from 'react'

type Tab = {
	id: string
	label: string
	content: React.ReactNode
}

type TabNavigationProps = {
	tabs: Tab[]
	defaultTab: string
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, defaultTab }) => {
	const [activeTab, setActiveTab] = useState(defaultTab)

	const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

	return (
		<div className="max-w-[600px] w-full px-10 pt-[60px] pb-[46px] rounded-[15px] bg-primary text-mainwhite">
			<div className="flex justify-around items-center border-b-[2px] border-placeholder leading-[17px]">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						className={`relative w-[130px] pb-5 text-xl font-normal ${activeTab === tab.id ? 'text-white' : ''
							}`}
						onClick={() => setActiveTab(tab.id)}
						aria-selected={activeTab === tab.id}
						role="tab"
					>
						{tab.label}
						{activeTab === tab.id && (
							<div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-secondary" />
						)}
					</button>
				))}
			</div>

			<div className="pt-5" role="tabpanel">
				{activeTabContent}
			</div>
		</div>
	)
}