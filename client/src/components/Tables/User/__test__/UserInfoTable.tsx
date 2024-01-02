import { Button } from '@/components/Button';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const UserInfoTable = () => {
	const userInfoTableHeader: string[] = [
		'',
		'Complete Name',
		'Role',
		'Username',
		'Contact',
		'Emergency #',
		'Action',
	];
	const { data, isLoading } = useQuery({
		queryKey: ['userInformation'],
		queryFn: () =>
			axios.get(
				'https://my.api.mockaroo.com/rgs/user_information?key=a499edc0',
			),
	});

	if (isLoading) {
		return (
			<>
				<table className="w-full overflow-y-scroll">
					<thead className="table-head border-b border-black/10 bg-white ">
						<tr>
							{userInfoTableHeader.map(header => (
								<th className="py-5 text-xs font-bold uppercase">
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-primary-white h-full overflow-y-auto"></tbody>
				</table>
				<div className="flex items-center justify-center">Loading...</div>
			</>
		);
	}

	return (
		<table className="w-full overflow-y-scroll">
			<thead className="table-head border-b border-black/10 bg-white ">
				<tr>
					{userInfoTableHeader.map(header => (
						<th className="py-5 text-xs font-bold uppercase">{header}</th>
					))}
				</tr>
			</thead>
			<tbody className="bg-primary-white h-full overflow-y-auto">
				{data?.data.map((userInfo: any) => {
					return (
						<tr className="text-center">
							<td className="w-16">
								<input type="checkbox" />
							</td>
							<td className="py-2 text-xs font-normal uppercase">
								<span>
									{`${userInfo.last_name} ${userInfo.first_name}`}
								</span>
							</td>
							<td className="py-2 text-xs font-normal uppercase">
								{userInfo.role}
							</td>
							<td className="py-2 text-xs font-normal uppercase">
								{userInfo.username}
							</td>
							<td className="py-2 text-xs font-normal uppercase">
								{userInfo.contact_number}
							</td>
							<td className="py-2 text-xs font-normal uppercase">
								{userInfo.emergency_number}
							</td>
							<td className="py-2 text-xs font-normal uppercase">
								<Button fill={'yellow'} textColor={'black'}>
									Edit User
								</Button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default UserInfoTable;
