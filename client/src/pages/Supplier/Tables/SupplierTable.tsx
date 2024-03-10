/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from '@/components';
import { removeSupplier, useSupplier } from '@/api/Supplier';
import { useModal } from '@/utils/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FC, useState } from 'react';
import { SupplierForm } from '@/pages';
import { FaPencilAlt } from 'react-icons/fa';
import { ColumnDef } from '@tanstack/react-table';
import { SortIcon } from '@/assets/icons';
import { DataTable } from '@/components/Tables/DataTable';

interface SupplierTableProps {
	data: any;
	onOpen: any;
}

export const SupplierTable: FC<SupplierTableProps> = ({ data, onOpen }) => {
	const queryClient = useQueryClient();

	type Supplier = {
		id: number;
		name: string;
		contact_no: string;
		address: string;
	};

	const SupplierTableHeader: ColumnDef<Supplier>[] = [
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
			accessorKey: 'name',
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
							className="bg-transparent text-black flex flex-row ml-auto mr-auto items-center"
						>
							NAME <SortIcon />
						</Button>
					</div>
				)
			},
		},

		{
			accessorKey: 'contact_no',
			header:	() => <div>CONTACT NUMBER</div>,
		},

		{
			accessorKey: 'address',
			header:	() => <div>ADDRESS</div>,
		},

		{
			id: 'actions',
			header:	() => <div>ACTION</div>,
			cell: ({ row }) => {
				const supplierRow = row.original;
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<Button
							fill="empty"
							textColor={'black'}
							onClick={() => handleUpdateModal(supplierRow)}
							className="flex flex-row items-center gap-2"
						>
							<FaPencilAlt /> Edit
						</Button>
						<Button
							fill={'red'}
							onClick={() => handleRemoveSupplier(supplierRow)}
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
	const [selectedSupplier, setSelectedSupplier] = useState<any | null>(null);

	const { mutateAsync: removeSupplierMutation } = useMutation({
		mutationKey: ['removeSupplier:', selectedSupplier],
		mutationFn: removeSupplier,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['supplier'] });
			console.log('Supplier removed');
			removeModal.closeModal();
			successModal.openModal();
		},
		onError: error => {
			console.error('Supplier Data submission failed', error);
		},
	});

	const handleUpdateModal = (Supplier: any) => {
		setSelectedSupplier(Supplier);
		updateModal.openModal();
		console.log('Update Supplier', Supplier);
	};
	const handleRemoveSupplier = (Supplier: any) => {
		setSelectedSupplier(Supplier);
		removeModal.openModal();
		console.log(Supplier.id);
	};

	return (
		<>
			<DataTable
				data={data}
				columns={SupplierTableHeader}
				filterWhat={"name"}
				dataType={"Supplier"}
				openModal={onOpen} />

			<Modal isOpen={removeModal.isOpen} onClose={removeModal.closeModal}>
				<>
					<div className="flex flex-col gap-4">
						<p className="text-center font-bold uppercase">
							Are you sure you want to remove?
						</p>
						<span>{`Supplier ID: ${selectedSupplier?.id}`}</span>
						<span>{`Supplier Name: ${selectedSupplier?.name}`}</span>
						<span>{`Supplier Location: ${selectedSupplier?.address}`}</span>

						<div className="flex flex-row justify-center gap-1">
							<Button
								fill={'green'}
								className=""
								type="submit"
								onClick={() =>
									removeSupplierMutation(selectedSupplier.id)
								}
							>
								{`Remove ${selectedSupplier?.name}`}
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
					<SupplierForm
						data={selectedSupplier}
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
						{`Supplier ${selectedSupplier?.Supplier_name} successfully removed`}
					</p>
					<Button fill={'green'} onClick={successModal.closeModal}>
						Close
					</Button>
				</div>
			</Modal>
		</>
	);
};
