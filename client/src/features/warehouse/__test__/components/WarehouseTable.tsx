import { useWarehouse } from '../context/WarehouseContext';
import { Button, ProgressBar } from '@/components';
import { FaPencilAlt } from 'react-icons/fa';
import { DataTable } from '@/components/Tables/DataTable';
import { SortIcon } from '@/assets/icons';
import { ColumnDef } from '@tanstack/react-table';
import { Warehouse } from '../types';
import { useModal } from '@/utils/Modal';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { removeWarehouse } from '../api/Warehouse';

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

	const tableHeader: ColumnDef<Warehouse>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<input type="checkbox" 
					checked={table.getIsAllPageRowsSelected()}
					onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<input type="checkbox" 
					checked={row.getIsSelected()}
					onChange={(e) => row.toggleSelected(!!e.target.checked)}
					aria-label="Select row"
					className="justify-center"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},

		{
			accessorKey: 'id',
			header:	() => <div className='justify-center'>WAREHOUSE ID</div>,
		},

		{
			accessorKey: 'name',
			header: ({ column }) => {
				return (
					<div className='justify-center'>
						<Button
							onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
							className="bg-transparent text-black flex flex-row"
						>
							WAREHOUSE NAME <SortIcon />
						</Button>
					</div>
				)
			},
		},

		{
			accessorKey: 'location',
			header:	() => <div className='justify-center'>LOCATION</div>,
		},

		{
			id: 'actions',
			header:	() => <div className='flex flex-row justify-center'>ACTIONS</div>,
			cell: ({ row }) => {
				const warehouseRow = row.original;
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<Button
							fill="empty"
							textColor={'black'}
							onClick={() => handleUpdateModal(warehouseRow)}
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
			}
		}

	];

	const removeModal = useModal();
	const successModal = useModal();
	const updateModal = useModal();
	const [selectedWarehouse, setSelectedWarehouse] = useState<any | null>(null);
	const { isOpen, openModal, closeModal } = useModal();

	const { mutateAsync: removeWarehouseMutation } = useMutation({
		mutationKey: ['removeWarehouse:', selectedWarehouse],
		mutationFn: removeWarehouse,
		onSuccess: async () => {
			// await queryClient.invalidateQueries({ queryKey: ['warehouses'] });
			console.log('Warehouse removed');
			removeModal.closeModal();
			successModal.openModal();
		},
		onError: error => {
			console.error('Warehouse Data submission failed', error);
		},
	});

	const handleUpdateModal = (warehouse: any) => {
		setSelectedWarehouse(warehouse);
		updateModal.openModal();
		console.log('Update Warehouse', warehouse);
	};

	const handleRemoveWarehouse = (warehouse: any) => {
		setSelectedWarehouse(warehouse);
		removeModal.openModal();
		console.log(warehouse.id);
	};

	return (
		<>
			<DataTable
				data={warehouse}
				columns={tableHeader}
				filterWhat={"location"}
				dataType={"Warehouse"}
				isOpen={isOpen}
				openModal={openModal}
				closeModal={closeModal}
			/>
		</>
	);
};
