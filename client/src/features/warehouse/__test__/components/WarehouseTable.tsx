import { useWarehouse } from '../context/WarehouseContext';
import { Button } from '@/components';
import { FaPencilAlt } from 'react-icons/fa';
import { TableHeader } from './Table/TableHeader';
import { TableBody } from './Table/TableBody';

interface WarehouseTableProps {}

export const WarehouseTable = ({}: WarehouseTableProps) => {
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
				<TableHeader header={WarehouseTableHeader} />
				<TableBody />
			</table>
		</>
	);
};
