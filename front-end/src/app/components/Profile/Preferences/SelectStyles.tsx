const customStyles = {
	option: (provided: any) => ({
		...provided,
		height: '44px',
		backgroundColor: 'transparent',
		color: '#ffffff',
		padding: '7px',
		outline: 'none',
		'&:not(:last-child)': {
			borderBottom: '1px solid #5B728180',
		}
	}),
	control: (provided: any) => ({
		...provided,
		height: '44px',
		backgroundColor: 'transparent',
		borderRadius: '5px',
		border: '1px solid #5B7281',
		outline: 'none',
		boxShadow: 'none',
		// '&:hover': {
		// 	border: 'none',
		// },
		'&:focus': {
			border: 'none',
			boxShadow: 'none',
		},
	}),
	singleValue: (provided: any) => ({
		...provided,
		color: '#ffffff',
	}),
	valueContainer: (provided: any) => ({
		...provided,
		color: '#ffffff',
	}),
	input: (provided: any) => ({
		...provided,
		color: '#ffffff',
	}),
	indicatorSeparator: () => ({
		display: 'none',
	}),
	dropdownIndicator: (provided: any) => ({
		...provided,
		color: '#ffffff',
		'&:hover': {
			color: '#ffffff',
		},
	}),
	menu: (provided: any) => ({
		...provided,
		backgroundColor: '#1A2C38', // Match the option background
		borderRadius: '5px', // Optional: consistent rounding
		marginTop: -1, // Remove any gap between control and menu
		marginBottom: 0,
	}),
	menuList: (provided: any) => ({
		...provided,
		padding: 0, // Remove padding that causes white stripes
		backgroundColor: '#1A2C38', // Ensure no gaps show a different color
	}),
}

export { customStyles }