import { useNewTransfer } from '../../context/NewTransferContext';
import { AddItemButton, InventorySelect } from '../primitives';
import { useState } from 'react';
import { TransferItemsQueueForm } from './form/ItemsQueueForm';
import { DataTable } from '@/components/Tables/DataTable';
import { Button } from '@/components';
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
// import { addTransfer } from '../../api/Transfer';
import { useTransferAddition } from '../../hooks';
import { TransferAdd } from '../../types';
import { Loading } from '@/components';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface ItemsTabProps {
	onClose: () => void;
}

export const ItemsTab = ({ onClose }: ItemsTabProps) => {
	const { newTransfer, handleChange } = useNewTransfer();
	const [editProduct, setEditProduct] = useState<any>(null);
	const { addTransferMutation, isPending, success } = useTransferAddition();
	const TransferProductTableHeader: ColumnDef<any>[] = [
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
			id: 'product_name',
			sortingFn: 'text',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row items-center bg-transparent text-black"
						>
							PRODUCT NAME{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => {
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						{row.original.product_name}
					</div>
				);
			},
		},

		{
			accessorKey: 'total_quantity',
			header: () => <div className="text-center">TOTAL QUANTITY</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.total_quantity}</div>
			),
		},

		{
			accessorKey: 'capital price',
			header: () => <div className="text-center">Capital Price</div>,
			cell: ({ row }) => (
				<div className="text-center">
					{Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'PHP',
					}).format(row.original.capital_price)}
				</div>
			),
		},
		{
			id: 'actions',
			header: () => <div></div>,
			cell: ({ row }) => {
				const productRow = row.original;
				return (
					<div className="flex flex-row justify-center gap-3 text-xs font-normal uppercase">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Pencil
										onClick={() => {
											setActiveView('form');
											setEditProduct(productRow);
										}}
										size={20}
										className=" text-yellow-500"
									/>
								</TooltipTrigger>
								<TooltipContent>
									<p>Edit</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Trash2
										onClick={() => {
											const filteredProducts =
												newTransfer.transferItems.filter(
													(data: any) => data.id !== productRow.id,
												);

											handleChange(
												'transferItems',
												filteredProducts,
											);
										}}
										size={20}
										className="text-red-500"
									/>
								</TooltipTrigger>
								<TooltipContent>
									<p>Remove</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				);
			},
		},
	];

	const [activeView, setActiveView] = useState<string>('table');

	const handleRequestTransfer = async () => {
		addTransferMutation(newTransfer as unknown as TransferAdd).catch(
			error => {
				toast.error(error.response.data.message);
			},
		);
	};

	useEffect(() => {
		if (success) {
			toast(success, {
				position: 'top-right',
				closeOnClick: true,
				type: 'success',
			});
			onClose();
		}
	}, [success]);

	return (
		<>
			{isPending && (
				<div className="absolute left-[45%] top-[43%] z-50">
					<Loading />
				</div>
			)}
			<div className={`flex flex-col gap-4 ${isPending ? 'blur-sm' : ''}`}>
				<div className="grid grid-cols-12 gap-4">
					<InventorySelect tabState="items" />
					<AddItemButton
						activeView={activeView}
						setActiveView={setActiveView}
						setEditProduct={setEditProduct}
					/>
				</div>

				{activeView === 'table' && (
					<div className="h-[400px] w-full bg-slate-100">
						<DataTable
							data={newTransfer.transferItems}
							columns={TransferProductTableHeader}
							dataType={'Transfer Products'}
							isLoading={false}
							hideFilter={true}
							filterWhat={''}
						/>
					</div>
				)}
				{activeView === 'form' && (
					<div className="h-[200px] w-full ">
						<TransferItemsQueueForm
							setActiveView={setActiveView}
							editProduct={editProduct}
						/>
					</div>
				)}

				<div
					className={`flex flex-col items-end ${activeView === 'form' ? 'hidden' : ''}`}
				>
					<Button
						disabled={newTransfer.transferItems.length <= 0 || isPending}
						onClick={handleRequestTransfer}
						fill={'green'}
						className="disabled:opacity-50"
					>
						Submit Request
					</Button>
				</div>
			</div>
		</>
	);
};
