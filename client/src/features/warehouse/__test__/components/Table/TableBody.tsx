import { Button } from '@/components';
import { useWarehouse } from '../../context/WarehouseContext';
import { FaPencilAlt } from 'react-icons/fa';

interface TableBodyProps {}

export const TableBody = ({}: TableBodyProps) => {
	const warehouse = useWarehouse();

	return (
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
			))}
		</tbody>
	);
};
