import { Button } from '@/components/Button';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { FC } from 'react';

interface UserTableProps {
	data: any;
}

export const UserInfoTable: FC<UserTableProps> = ({ data }) =>{
	const userInfoTableHeader: string[] = [
		'',
		'Complete Name',
		'Role',
		'Username',
		'Contact',
		'Emergency #',
		'Action',
	];

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
					{data?.map((userInfo: any) => {
						return (
							<tr key={userInfo.id} className="text-center">
								<td className="w-16">
									<input type="checkbox" />
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>
										{`${userInfo.lastname} ${userInfo.firstname}`}
									</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{userInfo.role} {/* to inner join with roles table */}
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
		</>
	);
};

export default UserInfoTable;
