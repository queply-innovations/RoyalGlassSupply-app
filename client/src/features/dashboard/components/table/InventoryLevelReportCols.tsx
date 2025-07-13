import { ProductPrices } from '@/features/product/__test__/types';
import { ColumnDef } from '@tanstack/react-table';

export const InventoryLevelReportCols = () => {
	const columns: ColumnDef<ProductPrices>[] = [
		{
			accessorKey: 'product.name',
			header: () => (
				<div className="text-xs font-bold uppercase text-slate-800">
					Name
				</div>
			),
		},
		{
			accessorKey: 'product.brand',
			header: () => (
				<div className="text-xs font-bold uppercase text-slate-800">
					Brand
				</div>
			),
		},
		{
			accessorKey: 'product.size',
			header: () => (
				<div className="text-xs font-bold uppercase text-slate-800">
					Size
				</div>
			),
		},
		{
			accessorKey: 'product.color',
			header: () => (
				<div className="text-xs font-bold uppercase text-slate-800">
					Color
				</div>
			),
		},
		{
			accessorKey: 'inventory_product.inventory.code',
			header: () => (
				<div className="text-xs font-bold uppercase text-slate-800">
					Inventory
				</div>
			),
		},
		{
			id: 'message',
			header: () => <div className="uppercase"></div>,
			cell: () => <span className="text-xs font-medium">Running low</span>,
		},
	];

	return columns;
};
