import { useWarehouse } from '../context/WarehouseContext';
import { Button } from '@/components';
import { FaPencilAlt } from 'react-icons/fa';
import { DataTable } from '@/components/Tables/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Warehouse } from '../types';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

interface WarehouseTableProps {
	openModal: (data: Warehouse, action: string) => void;
}

export const WarehouseTable = ({ openModal }: WarehouseTableProps) => {
	const { warehouses, setWarehouseSelected, isFetching, progress } = useWarehouse();

	const handleAddWarehouse = () => {
		openModal({} as Warehouse, 'add');
	};

	const WarehouseTableHeader: ColumnDef<Warehouse>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<input
					type="checkbox"
					checked={table.getIsAllPageRowsSelected()}
					onChange={e =>
						table.toggleAllPageRowsSelected(!!e.target.checked)
					}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<input
					type="checkbox"
					checked={row.getIsSelected()}
					onChange={e => row.toggleSelected(!!e.target.checked)}
					aria-label="Select row"
					className="justify-center"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},

		{
			accessorKey: 'id',
			header: () => <div className="justify-center">WAREHOUSE ID</div>,
		},

		{
			accessorKey: 'name',
			sortingFn: "text",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div className='items-center'>
						<Button
							onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
						>
							WAREHOUSE NAME {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				);
			},
		},
		{
			accessorKey: 'code',
			header: () => <div className="justify-center">code</div>,
		},
		{
			accessorKey: 'location',
			header: () => <div className="justify-center">LOCATION</div>,
		},

		{
			id: 'actions',
			header: () => (
				<div className="flex flex-row justify-center">ACTIONS</div>
			),
			cell: ({ row }) => {
				const warehouseRow = row.original;
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<Button
							fill="empty"
							textColor={'black'}
							onClick={() => handleEditWarehouse(warehouseRow)}
							className="flex flex-row items-center gap-2"
						>
							<FaPencilAlt /> Edit
						</Button>
						<Button
							fill={'red'}
							onClick={() => handleRemoveWarehouse(warehouseRow)}
						>
							Remove
						</Button>
					</div>
				);
			},
		},
	];

	// * This function is used to handle the edit warehouse
	const handleEditWarehouse = (warehouses: Warehouse) => {
		// console.log('Edit Warehouse Clicked:', warehouses);

		// * Set the warehouse selected from props to the warehouse selected state
		setWarehouseSelected(warehouses);
		// * Then open modal edit with the warehouse data
		openModal(warehouses, 'edit');
	};

	// * This function is used to handle the remove warehouse
	const handleRemoveWarehouse = (warehouses: Warehouse) => {
		// console.log('Remove Warehouse Clicked:', warehouses);

		// * Set the warehouse selected from props to the warehouse selected state
		setWarehouseSelected(warehouses);
		// * Then open modal remove with the warehouse data
		openModal(warehouses, 'remove');
	};

	return (
		<>
			<DataTable
				data={warehouses}
				columns={WarehouseTableHeader}
				filterWhat={'location'}
				dataType={'Warehouse'}
				isLoading={isFetching}
				openModal={handleAddWarehouse}
			/>
		</>
	);
};
