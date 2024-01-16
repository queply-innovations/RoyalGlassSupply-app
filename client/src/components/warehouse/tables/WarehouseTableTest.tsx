import { Button } from '@/components/Button';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

export const WarehouseTable = () => {
	const WarehouseTableHeader: string[] = [
		'',
		'Warehouse ID',
		'Warehouse Name',
		'Location',
		'Action',
	];

	const { data, isLoading } = useQuery({
		queryKey: ['warehouse'],
		queryFn: () =>
			axios
				.get(
					'https://65956d2504335332df82b67a.mockapi.io/rgs/api/Warehouse',
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
						{WarehouseTableHeader.map(header => (
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
					{data?.data.map((warehouse: any) => {
						return (
							<tr key={warehouse.id} className="text-center">
								<td className="w-16">
									<input type="checkbox" />
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{warehouse.id}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{warehouse.warehouse_name}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{warehouse.location}
								</td>
								<td className="flex flex-row justify-center gap-3 py-2 text-xs font-normal uppercase">
									<Button fill={'yellow'} textColor={'black'}>
										Edit
									</Button>
									<Button fill={'red'}>Remove</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{isLoading && (
				<div className="flex items-center justify-center">
					Fetching Warehouse Information Data...
				</div>
			)}
		</>
	);
};

export default WarehouseTable;
