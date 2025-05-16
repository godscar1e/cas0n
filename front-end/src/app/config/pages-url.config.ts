class DASHBOARD {
	private root = '/'

	HOME = this.root
	SETTINGS = `${this.root}/settings`
}

export const DASHBOARD_PAGES = new DASHBOARD()


class HOME {
	private root = '/'

	HOME = this.root
}

export const HOMEPAGE = new HOME()