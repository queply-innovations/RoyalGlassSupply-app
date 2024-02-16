/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from '@/components';
import { removeWarehouse, useWarehouses } from '@/api/Warehouse';
import { useModal } from '@/utils/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { WarehouseForm } from '@pages/Warehouse';
import { FaPencilAlt } from 'react-icons/fa';
import { DataTable } from '@/components/Tables/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import SortIcon from '@assets/icons/iconUpDown';

interface WarehouseTableProps {
	data: any;
}

export const WarehouseTable: FC<WarehouseTableProps> = ({ data }) => {
	const queryClient = useQueryClient();
	type Warehouse = {
		id: number
		name: string
		location: string
	}

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

	const { mutateAsync: removeWarehouseMutation } = useMutation({
		mutationKey: ['removeWarehouse:', selectedWarehouse],
		mutationFn: removeWarehouse,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['warehouses'] });
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
			data={data}
			columns={tableHeader}
			filterWhat={"location"}
		/>

		<Modal isOpen={removeModal.isOpen} onClose={removeModal.closeModal}>
			<>
				<div className="flex flex-col gap-4">
					<p className="text-center font-bold uppercase">
						Are you sure you want to remove?
					</p>
					<span>{`Warehouse ID: ${selectedWarehouse?.id}`}</span>
					<span>{`Warehouse Name: ${selectedWarehouse?.name}`}</span>
					<span>{`Warehouse Location: ${selectedWarehouse?.location}`}</span>

					<div className="flex flex-row justify-center gap-1">
						<Button
							fill={'green'}
							className=""
							type="submit"
							onClick={() =>
								removeWarehouseMutation(selectedWarehouse.id)
							}
						>
							{`Remove ${selectedWarehouse?.name}`}
						</Button>
						<Button
							fill={'red'}
							className=""
							type="reset"
							onClick={removeModal.closeModal}
						>
							Cancel
						</Button>
					</div>
				</div>
			</>
		</Modal>
		<Modal isOpen={updateModal.isOpen} onClose={updateModal.closeModal}>
			<>
				<WarehouseForm
					data={selectedWarehouse}
					onClose={updateModal.closeModal}
					isUpdate={true}
				/>
			</>
		</Modal>
		<Modal
			isOpen={successModal.isOpen}
			onClose={() => {
				successModal.closeModal();
				setTimeout(() => {
					successModal.closeModal();
				}, 50000);
			}}
		>
			<div className="flex flex-col items-center justify-center gap-2">
				<p>
					{`Warehouse ${selectedWarehouse?.name} successfully removed`}
				</p>
				<Button fill={'green'} onClick={successModal.closeModal}>
					Close
				</Button>
			</div>
		</Modal>
		</>
	);
};
