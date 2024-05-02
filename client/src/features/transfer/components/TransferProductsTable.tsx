import { DataTable } from '@/components/Tables/DataTable';
import { Transfer, TransferProduct, TransferProductFull } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { useTransfer } from '../context/TransferContext';
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components';

import {
	MoreVertical,
	Pencil,
	List,
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	Ban,
	Check,
	Clock,
	Loader2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useProductQuery } from '@/features/product/__test__/hooks';

interface TransferProductsTableProps {
	openModal: (data: TransferProductFull, action: string) => void;
}

export const TransferProductsTable: FC<TransferProductsTableProps> = ({ openModal }: TransferProductsTableProps) =>{
	const { 
		transfers, 
		transferProducts, 
		isFetching, 
		selectedTransfer, 
		setSelectedTransfer, 
		selectedProduct, 
		setSelectedProduct,
		addProd,
		setAddProd 
	} = useTransfer();
	const { auth } = useAuth();

	const filteredTransferProducts = transferProducts.filter((prod) => prod.transfer_id === selectedTransfer.id);

	const handleEditProduct = (product: TransferProductFull) => {
		setSelectedProduct(product);
		setAddProd(false);
		openModal(product, 'edit');
	};

	const handleAddProduct = () => {
		setAddProd(true);
		openModal({} as TransferProductFull, 'add');
	};

	// console.log(addProd);
	
	const TransferProductTableHeader: ColumnDef<TransferProductFull>[] = [
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
			id: 'product_name',
			sortingFn: "text",
			enableSorting: true,
			header:	({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row bg-transparent text-black items-center"
						>
							PRODUCT NAME {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => {
				return (
					<div className="flex flex-row text-xs justify-center font-normal uppercase">
						{row.original.product.name}
					</div>
				);
			}
		},

		{
			accessorKey: 'total_quantity',
			header:	() => <div className="text-center">TOTAL QUANTITY</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.total_quantity}</div>
			),
		},

		{
			accessorKey: 'unit',
			header:	() => <div className="text-center">UNIT</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.unit}</div>
			),
		},

		{
			id: 'actions',
			header:	() => <div></div>,
			cell: ({ row }) => {
				const productRow = row.original;
				return (
					selectedTransfer.transfer_status != 'arrived' && 
					selectedTransfer.approval_status != 'rejected' && (
						<div className="flex flex-row text-xs justify-center font-normal uppercase">
							<Button 
								fill={'yellow'} 
								textColor={'black'}
								onClick={() => handleEditProduct(productRow)}
							>
								Edit Product
							</Button>
						</div>
					)
				);
			}
		}

	];

	return (
		<>
			<DataTable
				data={filteredTransferProducts}
				columns={TransferProductTableHeader}
				filterWhat={"product_name"}
				dataType={"Transfer Products"}
				openModal={selectedTransfer.transfer_status != 'arrived' && 
							selectedTransfer.approval_status != 'rejected' ? handleAddProduct : undefined}
				isLoading={isFetching} />

				{/* TODO: PLEASE CHECK IF ADD TRANSFER PRODUCT IS HIDDEN IF TRANSFER HAS ARRIVED */}
		</>
	);
};

export default TransferProductsTable;