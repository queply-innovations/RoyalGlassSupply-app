/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/Button';
import { fetchWarehouses } from '@/utils/api/Warehouse';
import { useQuery } from '@tanstack/react-query';

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
		queryFn: () => fetchWarehouses(),
	});
	console.log(data);

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
					{data?.map((warehouse: any) => {
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
