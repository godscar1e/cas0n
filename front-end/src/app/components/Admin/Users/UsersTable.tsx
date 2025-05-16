interface UsersTableProps {
	users: any[] // Типизируйте на основе структуры данных пользователя
}

export default function UsersTable({ users }: UsersTableProps) {
	const formatDate = (dateString: string | number | Date) => {
		if (!dateString) return 'N/A'
		const date = new Date(dateString)
		return date.toLocaleDateString('en-GB') // формат dd/mm/yyyy
	}

	const getUserStatus = (user: any) => {
		return user.isActive ? 'Online' : 'Offline'
	}

	return (
		<div className="">
			<table className="table-auto w-full border-collapse border text-mainwhite">
				<thead>
					<tr>
						<th className="border border-placeholder p-5 text-2xl font-light">ID</th>
						<th className="border border-placeholder p-5 text-2xl font-light">Name</th>
						<th className="border border-placeholder p-5 text-2xl font-light">Email</th>
						<th className="border border-placeholder p-5 text-2xl font-light">Role</th>
						<th className="border border-placeholder p-5 text-2xl font-light">Status</th>
						<th className="border border-placeholder p-5 text-2xl font-light">Exp</th>
						<th className="border border-placeholder p-5 text-2xl font-light">Deposit</th>
						<th className="border border-placeholder p-5 text-2xl font-light">Withdrawals</th>
						<th className="border border-placeholder p-5 text-2xl font-light">WARGER</th>
						<th className="border border-placeholder p-5 text-2xl font-light">Referral Code</th>
						<th className="border border-placeholder p-5 text-2xl font-light">CreatedAt</th>
					</tr>
				</thead>
				<tbody>
					{users?.length > 0 ? (
						users.map((user) => (
							<tr key={user.id} className="text-[#FFFFFF] text-lg font-light text-center">
								<td className="max-w-24 border border-placeholder p-2 text-center overflow-x-hidden">{user.id}</td>
								<td className="border border-placeholder p-2">{user.username || 'N/A'}</td>
								<td className="border border-placeholder p-2">{user.email}</td>
								<td className="border border-placeholder p-2">{user.role}</td>
								<td className="border border-placeholder p-2">{getUserStatus(user)}</td>
								<td className="border border-placeholder p-2">{user.experience || 'N/A'}</td>
								<td className="border border-placeholder p-2">deposit</td>
								<td className="border border-placeholder p-2">Withdrawals</td>
								<td className="border border-placeholder p-2">WARGER</td>
								<td className="border border-placeholder p-2">{user.referralCode || 'N/A'}</td>
								<td className="border border-placeholder p-2">{formatDate(user.createdAt)}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={10} className="text-center p-4 text-gray-500 border border-placeholder">
								No users found
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

