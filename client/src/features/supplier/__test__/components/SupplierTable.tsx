/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from '@/components';
import { useModal } from '@/utils/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FC, useState } from 'react';
import { SupplierForm } from '@/pages';
import { FaPencilAlt } from 'react-icons/fa';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/Tables/DataTable';
import { Supplier } from '../../types';
import { useSupplier } from '../context/SupplierContext';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

interface SupplierTableProps {
	openModal: (data: Supplier, action: string) => void;
	isUpdate?: boolean;
}

export const SupplierTable = ({ openModal }: SupplierTableProps) => {
	const { suppliers, isFetching, progress, setSelectedSupplier } = useSupplier();

	const handleAddSupplier = () => {
		openModal({} as Supplier, 'add');
	};

	const handleEditSupplier = (supplier: Supplier) => {
		setSelectedSupplier(supplier);
		openModal(supplier, 'edit');
	};

	const SupplierTableHeader: ColumnDef<Supplier>[] = [

		{
			accessorKey: 'name',
			sortingFn: "text",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div className="text-center">
						<Button
							onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
							className="bg-transparent text-black flex flex-row ml-auto mr-auto items-center"
						>
							NAME {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.name}</div>
			),
		},

		{
			accessorKey: 'contact_no',
			header:	() => <div className="text-center">CONTACT NUMBER</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.contact_no}</div>
			),
		},

		{
			accessorKey: 'address',
			header:	() => <div className="text-center">ADDRESS</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.address}</div>
			),
		},

		{
			id: 'actions',
			header:	() => <div className="text-center">ACTION</div>,
			cell: ({ row }) => {
				const supplierRow = row.original;
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<Button
							fill="empty"
							textColor={'black'}
							onClick={() => handleEditSupplier(supplierRow)}
							className="flex flex-row items-center gap-2"
						>
							<FaPencilAlt /> Edit
						</Button>
					</div>
				);
			}
		}

	];

	return (
		<>
			<DataTable
				data={suppliers}
				columns={SupplierTableHeader}
				filterWhat={"address"}
				dataType={"Supplier"}
				openModal={handleAddSupplier}
				isLoading={isFetching} />
		</>
	);
};
