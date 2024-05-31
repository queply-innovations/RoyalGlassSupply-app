import { useNewTransfer } from '../../context/NewTransferContext';
import { AddItemButton } from '../primitives';
import { useState } from 'react';
import { TransferItemsQueueForm } from './form/ItemsQueueForm';
import { DataTable } from '@/components/Tables/DataTable';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
// import { addTransfer } from '../../api/Transfer';
import { Loading } from '@/components';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTransfer } from '../../context/TransferContext';
import { useProductAddition } from '../../hooks';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { addTransferProduct } from '../../api/Transfer';
import { Modal } from '@/components';
import { deleteTransferProduct } from '../../api/Transfer';
import ReactLoading from 'react-loading';
import { ArrowLeft } from 'lucide-react';
import { SelectProductsTransfer } from './form/components/SelectProductTransfer';
import { TransferProduct } from '../../types';
import { ItemStocksCount, ItemCapitalPrice } from './form/components';
import { editTransferProduct } from '../../api/Transfer';

interface TransferItemTab {
	onClose: () => void;
}

export const TransferItemTab = ({ onClose }: TransferItemTab) => {
	const [editProduct, setEditProduct] = useState<any>(null);
	const [deleteProduct, setDeleteProduct] = useState<any>({
		isDeleting: false,
		product: null,
	});
	const [selectedProduct, setSelectedProduct] = useState<
		Omit<TransferProduct, 'transfer_id'> | any
	>();
	const queryClient = useQueryClient();
	// const { addTransferMutation } = useTransferAddition();

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
						{row.original.product.name}
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
											setSelectedProduct({
												...productRow,
												product_name: `${productRow.product.name} • ${productRow.product.brand} • ${productRow.product.size} • ${productRow.product.color}`,
											});
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
											setDeleteProduct({
												isDeleting: true,
												product: productRow,
											});
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

	const { mutateAsync: addProductMutation, isPending } = useMutation({
		mutationKey: ['transfer_product'],
		mutationFn: addTransferProduct,
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({
				queryKey: ['transfer_products'],
			});

			toast('Product has been added', {
				position: 'top-right',
				closeOnClick: true,
				type: 'success',
			});

			setActiveView('table');
		},
		onError: (error: any) => {
			console.error(error);
		},
	});

	const { mutateAsync: editProductMutation, isPending: isEditingProduct } =
		useMutation({
			mutationKey: ['transfer_product'],
			mutationFn: editTransferProduct,
			onSuccess: async () => {
				// Reset loading state
				await queryClient.invalidateQueries({
					queryKey: ['transfer_products'],
				});

				toast('Product has been edited', {
					position: 'top-right',
					closeOnClick: true,
					type: 'success',
				});
				setEditProduct(undefined);
				setActiveView('table');
			},
			onError: (error: any) => {
				console.error(error);
			},
		});

	const { mutateAsync: deleteProductMutation, isPending: isDeletingProduct } =
		useMutation({
			mutationKey: ['transfer_product'],
			mutationFn: deleteTransferProduct,
			onSuccess: async () => {
				// Reset loading state
				await queryClient.invalidateQueries({
					queryKey: ['transfer_products'],
				});

				setDeleteProduct((previous: any) => {
					return { ...previous, isDeleting: false };
				});

				toast('Product has been removed', {
					position: 'top-right',
					closeOnClick: true,
					type: 'success',
				});

				// setSuccess('Transfer product has been added');
				// setSuccess('Transfer product has been edited');
			},
			onError: (error: any) => {
				console.error(error);
			},
		});

	const { filteredInventoriesSrc } = useProductAddition();

	const { transferProducts, selectedTransfer } = useTransfer();

	const filteredTransferProducts = transferProducts.filter(
		prod => prod.transfer_id === selectedTransfer.id,
	);

	const assignedInventory = filteredInventoriesSrc.find(
		data => data?.id === filteredTransferProducts[0]?.source_inventory,
	);

	const [activeView, setActiveView] = useState<string>('table');

	useEffect(() => {
		if (activeView === 'table') {
			setSelectedProduct(undefined);
		}
	}, [activeView]);

	return (
		<>
			{(isPending || isDeletingProduct || isEditingProduct) && (
				<div className="absolute left-[45%] top-[43%] z-50">
					<Loading />
				</div>
			)}
			<Modal
				isOpen={deleteProduct.isDeleting}
				onClose={() => {
					setDeleteProduct((previous: any) => {
						return { ...previous, isDeleting: false };
					});
				}}
			>
				<div className="">
					<p className="text-center font-semibold">
						Are you sure you want to delete{' '}
						{deleteProduct?.product?.product?.name} from this transfer?
					</p>
					<p className="pt-2 text-center text-sm opacity-80">
						This process cannot be undone.
					</p>
					<div className="flex gap-2 pt-3">
						<Button
							onClick={() => {
								setDeleteProduct((previous: any) => {
									return { ...previous, isDeleting: false };
								});
							}}
							className="w-full bg-red-400 hover:bg-red-800"
							disabled={isDeletingProduct}
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								deleteProductMutation({
									id: deleteProduct.product.id,
								});
							}}
							disabled={isDeletingProduct}
							className="w-full bg-green-400 hover:bg-green-800"
						>
							{isDeletingProduct ? (
								<ReactLoading
									type="spin"
									width={20}
									className="relative top-[22px]"
								/>
							) : (
								'Confirm'
							)}
						</Button>
					</div>
				</div>
			</Modal>

			<div
				className={`flex flex-col gap-4 ${isPending || isDeletingProduct || isEditingProduct ? 'blur-sm' : ''}`}
			>
				<div className="grid grid-cols-12 gap-4">
					<div>
						<Label className="text-sm font-bold text-slate-800">
							Inventory
						</Label>
						<Button
							id="inventory"
							variant="outline"
							className="w-fit justify-between"
							disabled
						>
							{assignedInventory?.code
								? assignedInventory?.code
								: 'Loading...'}
						</Button>
					</div>

					<div className="col-span-3 col-start-10 flex h-full items-end">
						<Button
							variant={'secondary'}
							onClick={() => {
								if (activeView === 'form') {
									setActiveView('table');
								}

								if (activeView === 'table') {
									setActiveView('form');
								}
							}}
							disabled={assignedInventory?.code ? false : true}
							className="w-full text-sm font-bold text-slate-800 hover:bg-slate-300"
						>
							<div className="flex items-center gap-2">
								{activeView == 'table' && (
									<>
										<Plus />
										<span>Add Item</span>
									</>
								)}
								{activeView == 'form' && (
									<>
										<ArrowLeft />
										<span>Cancel</span>
									</>
								)}
							</div>
						</Button>
					</div>
				</div>

				{activeView === 'table' && (
					<div className="h-[400px] w-full bg-slate-100">
						<DataTable
							data={filteredTransferProducts}
							columns={TransferProductTableHeader}
							dataType={'Transfer Products'}
							isLoading={false}
							hideFilter={true}
							filterWhat={''}
						/>
					</div>
				)}
				{activeView === 'form' && (
					<div className="flex h-[200px] w-full flex-col">
						<SelectProductsTransfer
							selectedProduct={selectedProduct}
							setSelectedProduct={setSelectedProduct}
						/>
						<div className="mt-5 flex gap-3">
							<ItemStocksCount
								selectedProduct={selectedProduct}
								setSelectedProduct={setSelectedProduct}
							/>
							<ItemCapitalPrice
								selectedProduct={selectedProduct}
								setSelectedProduct={setSelectedProduct}
							/>
						</div>
						<Button
							variant={'secondary'}
							onClick={() => {
								if (editProduct) {
									editProductMutation({
										...selectedProduct,
										transfer_id: selectedTransfer.id,
									});
									return;
								}

								addProductMutation({
									...selectedProduct,
									transfer_id: selectedTransfer.id,
								});
							}}
							disabled={
								selectedProduct || isEditingProduct || isPending
									? false
									: true
							}
							className="mt-5 w-full text-sm font-bold text-slate-800 hover:bg-slate-300"
						>
							<p>{editProduct ? 'Apply changes' : 'Add Product'}</p>
						</Button>
					</div>
				)}
			</div>
		</>
	);
};
