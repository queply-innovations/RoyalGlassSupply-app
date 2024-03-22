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
		setSelectedProduct 
	} = useTransfer();
	const { auth } = useAuth();

	const filteredTransferProducts = transferProducts.filter((prod) => prod.transfer_id === selectedTransfer.id);

	const handleEditProduct = (product: TransferProductFull) => {
		setSelectedProduct(product);
		openModal(product, 'edit');
	};

	const handleAddProduct = () => {
		openModal({} as TransferProductFull, 'add');
	};
	
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
			accessorKey: 'bundles_count',
			header:	() => <div className="text-center">BUNDLES COUNT</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.bundles_count}</div>
			),
		},

		{
			accessorKey: 'bundles_unit',
			header:	() => <div className="text-center">BUNDLES UNIT</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.bundles_unit}</div>
			),
		},

		{
			accessorKey: 'quantity_per_bundle',
			header:	() => <div className="text-center">QUANTITY PER BUNDLE</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.quantity_per_bundle}</div>
			),
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
					<div className="flex flex-row text-xs justify-center font-normal uppercase">
						<Button 
							fill={'yellow'} 
							textColor={'black'}
							// onClick={() => handleEditUser(userinfoRow)}
						>
							Edit Product
						</Button>
					</div>
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
				openModal={handleAddProduct}
				isLoading={isFetching} />
		</>
	);
};

export default TransferProductsTable;