import { useWarehouseContext } from '../context/WarehouseContext';
import { Button } from '@/components';
import { FaPencilAlt } from 'react-icons/fa';

interface WarehouseTableProps {}

const WarehouseTable = ({}: WarehouseTableProps) => {
	const warehouse = useWarehouseContext();

	const WarehouseTableHeader: string[] = [
		'',
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
						<>
							<tr key={warehouse.id} className="text-center">
								<td className="py-2 text-xs font-normal uppercase">
									<span>{warehouse.id}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{warehouse.warehouse_name}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{warehouse.warehouse_location}
								</td>
								<td className="flex flex-row justify-center gap-3 py-2 text-xs font-normal uppercase">
									<Button
										fill={'empty'}
										textColor={'black'}
										//TODO: Add onClick function
										// onClick={() => handleUpdateModal(warehouse)}
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
						</>
					))}
					;
				</tbody>
			</table>
		</>
	);
};
export default WarehouseTable;
