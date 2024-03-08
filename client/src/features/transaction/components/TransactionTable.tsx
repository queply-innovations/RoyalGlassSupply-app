import { Button } from '@/components/Button';
import { DataTable } from '@/components/Tables/DataTable';
import { Transaction } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { useTransaction } from '../context/TransactionContext';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

interface TransactionTableProps {
	openModal: (data: Transaction, action: string) => void;
}

export const TransactionTable: FC<TransactionTableProps> = ({ openModal }: TransactionTableProps) =>{
	const { transactions, isFetching, progress } = useTransaction();
	
	const TransactionTableHeader: ColumnDef<Transaction>[] = [
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
			header:	() => <div>Product ID</div>,
		},

		{
			accessorKey: 'price',
			header:	() => <div>Price</div>,
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("amount"))
				const formatted = new Intl.NumberFormat("en-US", {
				  style: "currency",
				  currency: "PHP",
				}).format(amount)
				
				return <div>{formatted}</div>
			}
		},

		{
			accessorKey: 'product_name',
			sortingFn: "text",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
						>
							PRODUCT NAME {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
		},

		{
			accessorKey: 'dimensions',
			header:	() => <div>DIMENSIONS</div>,
		},

		{
			accessorKey: 'serial',
			header:	() => <div>SERIAL</div>,
		},

		{
			accessorKey: 'sku',
			header:	() => <div>SKU</div>,
		},

		{
			accessorKey: 'status',
			header:	() => <div>INVENTORY STATUS</div>,
			cell: ({ row }) => {
				const status = row.getValue("status");
				const formatting = (status === "LOW" ? "bg-red-500" : (status === "MEDIUM" ? "bg-amber-500" : "bg-lime-600"));
				
				return (
					<div className={`flex w-full flex-1 flex-col text-center ${formatting}`}>
						{row.getValue("status")}
					</div>
				);
			}
		},

		{
			accessorKey: 'type',
			header:	() => <div>ORDER TYPE</div>,
		},

		{
			accessorKey: 'quantity',
			header:	() => <div>QUANTITY</div>,
		},

	];

	return (
		<>
			<DataTable
				data={transactions}
				columns={TransactionTableHeader}
				filterWhat={"serial"}
				dataType={"Transaction"}
				openModal={() => openModal}
				isLoading={isFetching} />
		</>
	);
};

export default TransactionTable;