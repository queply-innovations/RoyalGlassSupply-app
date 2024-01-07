import { Button } from '@/components/Button';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

export const UserSalesTable = () => {
	const userInfoTableHeader: string[] = [
		'Username',
		'Role',
		'Number of Sales',
		'Amount of Sales',
		'Action',
	];

	const { data, isLoading } = useQuery({
		queryKey: ['userInformation'],
		queryFn: () =>
			axios
				.get(
					'https://65956d2504335332df82b67a.mockapi.io/rgs/api/UserSales',
				)
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
					{data?.data.map((userSales: any) => {
						return (
							<tr key={userSales.id} className="text-center">
								<td className="py-2 text-xs font-normal uppercase">
									{userSales.username}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{userSales.role}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{userSales.number_of_sales}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{`PHP ${userSales.amount_of_sales}`}
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
					Fetching User Sales Data...
				</div>
			)}
		</>
	);
};

export default UserSalesTable;
