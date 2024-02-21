import { useWarehouse } from '../context/WarehouseContext';
import { Button } from '@/components';
import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Warehouse } from '../types';

interface WarehouseTableProps {
	openModal: (data: Warehouse, action: string) => void;
	isUpdate?: boolean;
}

export const WarehouseTable = ({ openModal }: WarehouseTableProps) => {
	const warehouse = useWarehouse();

	const WarehouseTableHeader = [
		'Warehouse ID',
		'Warehouse Code',
		'Warehouse Name',
		'Location',
		'Action',
	];

	// * This function is used to handle the edit warehouse
	const handleEditWarehouse = (warehouses: Warehouse) => {
		console.log('Edit Warehouse Clicked:', warehouses);
		// * This function will open the modal with the warehouse data
		openModal(warehouses, 'edit');
	};

	// * This function is used to handle the remove warehouse
	const handleRemoveWarehouse = (warehouses: Warehouse) => {
		console.log('Remove Warehouse Clicked:', warehouses);
		openModal(warehouses, 'remove');
	};

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
								{warehouse.code}
							</td>
							<td className="py-2 text-xs font-normal uppercase">
								{warehouse.location}
							</td>
							<td className="flex flex-row justify-center gap-3 py-2 text-xs font-normal uppercase">
								<Button
									fill={'empty'}
									textColor={'black'}
									// * On click of this button, it will pass the warehouse data to the openModal function
									onClick={() => handleEditWarehouse(warehouse)}
									className="flex flex-row items-center gap-2"
								>
									<FaPencilAlt /> Edit
								</Button>
								<Button
									fill={'red'}
									// * On click of this button, it will pass the warehouse data to the openModal function
									onClick={() => handleRemoveWarehouse(warehouse)}
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
