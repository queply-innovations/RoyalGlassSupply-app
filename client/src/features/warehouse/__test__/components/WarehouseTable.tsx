import { useWarehouse } from '../context/WarehouseContext';
import { Button } from '@/components';
import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';

interface WarehouseTableProps {
	isUpdate?: boolean;
}

export const WarehouseTable = ({ isUpdate = false }: WarehouseTableProps) => {
	const [update, setUpdate] = useState<boolean>(isUpdate);
	const warehouse = useWarehouse();
	const WarehouseTableHeader = [
		'Warehouse ID',
		'Warehouse Name',
		'Location',
		'Action',
	];

	return (
		<>
			<table className="w-full ">
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
				<tbody className="bg-primary-white h-full">
					{warehouse.map(warehouse => (
						<tr key={warehouse.id} className="text-center">
							<td className="py-2 text-xs font-normal uppercase">
								<span>{warehouse.id}</span>
							</td>
							<td className="py-2 text-xs font-normal uppercase">
								{warehouse.name}
							</td>
							<td className="py-2 text-xs font-normal uppercase">
								{warehouse.location}
							</td>
							<td className="flex flex-row justify-center gap-3 py-2 text-xs font-normal uppercase">
								<Button
									fill={'empty'}
									textColor={'black'}
									//TODO: Add onClick function
									onClick={() => setUpdate(true)}
									className="flex flex-row items-center gap-2"
								>
									<FaPencilAlt /> Edit
								</Button>
								<Button
									fill={'red'}
									//TODO: Add onClick function
									// onClick={() => handleRemoveWarehouse(warehouse)}
								>
									Remove
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
