import { DataTable } from '@/components/Tables/DataTable';
import { TopSellingProducts } from '@/features/reports/types';
import { ColumnDef } from '@tanstack/react-table';

interface TopSellingProductsTableProps {
	data: TopSellingProducts[] | undefined;
	isLoading: boolean;
}

export const TopSellingProductsTable = ({
	data,
	isLoading,
}: TopSellingProductsTableProps) => {
	const columnDefinition: ColumnDef<TopSellingProducts>[] = [
		{
			id: 'product',
			accessorKey: 'product.name',
			header: () => <div className="justify-center uppercase">Name</div>,
		},
		{
			accessorKey: 'product.brand',
			header: () => <div className="justify-center uppercase">Brand</div>,
		},
		{
			accessorKey: 'product.size',
			header: () => <div className="justify-center uppercase">Size</div>,
		},
		{
			accessorKey: 'product.color',
			header: () => <div className="justify-center uppercase">Color</div>,
		},
		{
			accessorKey: 'sold_count',
			header: () => (
				<div className="justify-center uppercase">Sold count</div>
			),
			cell: ({ row }) => (
				<div className="justify-center">
					{Intl.NumberFormat().format(row.original.sold_count)}
				</div>
			),
		},
	];

	return (
		<div className="h-full overflow-auto rounded-md border">
			<DataTable
				columns={columnDefinition}
				data={data ?? []}
				isLoading={isLoading}
				dataType="top-selling-products"
				filterWhat="product"
				hideFilter
				hidePagination
			/>
		</div>
	);
};
