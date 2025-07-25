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
			accessorKey: 'id',
			header: () => <div className="text-center">WAREHOUSE ID</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.id}</div>
			),
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
			cell: ({ row }) => (
				<div className="text-center">{row.original.name}</div>
			),
		},
		{
			accessorKey: 'code',
			header: () => <div className="text-center">code</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.code}</div>
			),
		},
		{
			accessorKey: 'location',
			header: () => <div className="text-center">LOCATION</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.location}</div>
			),
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
				dataType={''}
				isLoading={isFetching}
				openModal={undefined}
			/>
		</>
	);
};
