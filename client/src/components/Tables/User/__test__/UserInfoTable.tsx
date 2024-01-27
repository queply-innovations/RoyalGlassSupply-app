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
			axios
				.get('https://65956d2504335332df82b67a.mockapi.io/rgs/api/UserInfo')
				.then(data => {
					console.log(data);
					return data;
				}),
	});

	return (
		<>
			<table className="w-full overflow-y-scroll">
				<thead className="table-head border-b border-black/10 bg-white ">
					<tr>
						{userInfoTableHeader.map(header => (
							<th
								key={header}
								className="py-5 text-xs font-bold uppercase"
							>
								{header}
							</th>
						))}
					</tr>
				</thead>

				<tbody className="bg-primary-white h-full overflow-y-auto">
					{data?.data.map((userInfo: any) => {
						return (
							<tr key={userInfo.id} className="text-center">
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
			{isLoading && (
				<div className="flex items-center justify-center">
					Fetching User Information Data...
				</div>
			)}
		</>
	);
};

export default UserInfoTable;
