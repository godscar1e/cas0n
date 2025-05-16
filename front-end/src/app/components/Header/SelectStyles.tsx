const selectStyles = {
	option: (provided: any) => ({
		...provided,
		width: '271px',
		height: '40px',
		backgroundColor: '#0F212E',
		color: '#ffffff',
		padding: '11px 15px 11px 15px',
		outline: 'none',
		cursor: 'pointer',
		'&:not(:last-child)': {
			borderBottom: '1px solid #2C424F',
		},
	}),
	control: (provided: any) => ({
		...provided,
		width: '162px',
		height: '38px',
		backgroundColor: '#0F212E',
		borderRadius: '5px 0px 0 5px',
		padding: '0',
		outline: 'none',
		border: 'none',
		boxShadow: 'none',
		cursor: 'pointer',
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
		// padding: '8px',
		margin: '0',
		borderRadius: '4px',
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
		width: '271px',
		backgroundColor: '#0F212E',
		borderRadius: '5px',
		marginTop: -1,
		marginBottom: 0,
		zIndex: 1000000,
		position: 'absolute',
		paddingTop: '0',
	}),
	menuList: (provided: any) => ({
		...provided,
		padding: 0,
		backgroundColor: '#0F212E',
		zIndex: 1000000,
	}),
	menuPortal: (provided: any) => ({
		...provided,
		zIndex: 1000000,
	}),
}

export { selectStyles }