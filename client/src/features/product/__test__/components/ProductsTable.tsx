import { ColumnDef } from '@tanstack/react-table';
import { useProducts } from '../context/ProductContext';
import { ProductPrices } from '../types';
import { DataTable } from '@/components/Tables/DataTable';
import { Button } from '@/components';
import { SortIcon } from '@/assets/icons';
import { FaPencilAlt } from 'react-icons/fa';

interface ProductsTableProps {
	openModal: (data: ProductPrices, action: string) => void;
}

/**
 * Renders a table of products.
 * @param openModal - Function to open the modal for editing or removing a product.
 * @returns The ProductsTable component.
 */
export const ProductsTable = ({ openModal }: ProductsTableProps) => {
	const { productsData, setSelectedProduct } = useProducts();

	const ProductsTableHeader: ColumnDef<ProductPrices>[] = [
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
		},
		{
			accessorKey: 'product.id',
			header: () => <div className="justify-center">ID</div>,
		},
		{
			id: 'name',
			accessorKey: 'product.name',
			header: ({ column }) => {
				return (
					<div className="justify-center">
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row bg-transparent text-black"
						>
							NAME <SortIcon />
						</Button>
					</div>
				);
			},
		},
		{
			accessorKey: 'type',
			header: () => <div className="justify-center">TYPE</div>,
		},
		{
			accessorKey: 'unit',
			header: () => <div className="justify-center">UNIT</div>,
		},
		{
			accessorKey: 'quantity',
			header: () => <div className="justify-center">QUANTITY</div>,
		},
		{
			accessorKey: 'capital_price',
			header: () => <div className="justify-center">CAPITAL PRICE</div>,
			cell: ({ row }) => {
				return (
					<div className="flex items-center">
						<span>₱ {row.original.capital_price.toFixed(2)}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'markup_price',
			header: () => <div className="justify-center">MARKUP</div>,
		},
		{
			accessorKey: 'retail_price',
			header: () => <div className="justify-center">RETAIL PRICE</div>,
			cell: ({ row }) => {
				return (
					<div className="flex items-center">
						<span>₱ {row.original.retail_price.toFixed(2)}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'on_sale',
			header: () => <div className="justify-center">ON SALE</div>,
			cell: ({ row }) => {
				return (
					<div className="flex items-center">
						<span>{row.original.on_sale === 1 ? 'YES' : 'NO'}</span>
					</div>
				);
			},
			enableGlobalFilter: false,
		},
		{
			accessorKey: 'sale_price',
			header: () => <div className="justify-center">SALE PRICE</div>,
			cell: ({ row }) => {
				return (
					<div className="flex items-center">
						<span>₱ {row.original.sale_price.toFixed(2)}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'approval_status',
			header: () => <div className="justify-center">APPROVAL STATUS</div>,
			cell: ({ row }) => {
				const status = row.original.approval_status;
				return (
					<div className="flex items-center">
						<div
							className={`${
								status === 'approved'
									? 'bg-green-600'
									: status === 'rejected'
										? 'bg-red-600'
										: 'bg-amber-600'
							}
            overflow-clip rounded-full px-3 py-1 text-xs font-bold uppercase text-white`}
						>
							{row.original.approval_status}
						</div>
					</div>
				);
			},
		},
		{
			id: 'actions',
			header: () => (
				<div className="flex flex-row justify-center">ACTIONS</div>
			),
			cell: ({ row }) => {
				const productRow = row.original;
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<Button
							fill="empty"
							textColor={'black'}
							onClick={() => handleProductDetails(productRow)}
							className="flex flex-row items-center gap-2"
						>
							Info
						</Button>
						<Button
							fill="empty"
							textColor={'black'}
							onClick={() => handleEditProduct(productRow)}
							className="flex flex-row items-center gap-2"
						>
							<FaPencilAlt /> Edit
						</Button>
						<Button
							fill={'red'}
							onClick={() => handleRemoveProduct(productRow)}
						>
							Remove
						</Button>
					</div>
				);
			},
			enableGlobalFilter: false,
		},
	];

	const handleProductDetails = (product: ProductPrices) => {
		setSelectedProduct(product);
		openModal(product, 'more_info');
	};

	/**
	 * Trigger modal for editing a product.
	 * @param product - The product to be edited.
	 */
	const handleEditProduct = (product: ProductPrices) => {
		setSelectedProduct(product);
		openModal(product, 'edit');
	};

	/**
	 * Trigger modal for removing a product.
	 * @param product - The product to be removed.
	 */
	const handleRemoveProduct = (product: ProductPrices) => {
		setSelectedProduct(product);
		openModal(product, 'remove');
	};

	return (
		<>
			<DataTable
				data={productsData}
				columns={ProductsTableHeader}
				filterWhat={'name'}
				dataType={'Product'}
				openModal={openModal}
			/>
		</>
	);
};
