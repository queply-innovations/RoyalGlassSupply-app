import { UseModalProps } from '@/utils/Modal';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
import { ColumnDef } from '@tanstack/react-table';
import { useUserSales } from '../context/UserSalesContext';
import { Invoice } from '../../types';
import { ArrowUp, ArrowDown, ArrowUpDown, MoreVertical, List, Ban, Check, Clock } from 'lucide-react';
import { DataTable } from '@/components/Tables/DataTable';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useExpenses } from '../../context';

interface ExpensesDetailsProps {
	onClose: UseModalProps['closeModal'];
}

export const ExpensesDetails = ({ onClose }: ExpensesDetailsProps) => {
	const { invoices,
		isFetching,
		selectedInvoice } = useExpenses();

	// const handleAdd = () => {
	// 	openModal({} as Invoice, 'add');
	// };

	// const currentInvoice = selectedInvoice[0];

	const ExpensesDetailsTableHeader: ColumnDef<Invoice>[] = [
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

		// {
		// 	accessorKey: 'id',
		// 	header:	() => <div className="text-center">ID</div>,
		// 	cell: ({ row }) => (
		// 		<div className="text-center">{row.original.id}</div>
		// 	),
		// },

		// {
		// 	accessorKey: 'code',
		// 	sortingFn: "alphanumeric",
		// 	enableSorting: true,
		// 	header: ({ column }) => {
		// 		return (
		// 			<div>
		// 				<Button
		// 					onClick={() => {
		// 						column.toggleSorting(column.getIsSorted() === "asc"); 
		// 					}}
		// 					className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
		// 				>
		// 					CODE {column.getIsSorted() === "asc" ? <ArrowUp /> : 
		// 								column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
		// 				</Button>
		// 			</div>
		// 		)
		// 	},
		// 	cell: ({ row }) => (
		// 		<div className="text-center">
		// 			{row.original.code}
		// 		</div>
		// 	),
		// },

		{
			accessorKey: 'or_no',
			sortingFn: "alphanumeric",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => {
								column.toggleSorting(column.getIsSorted() === "asc"); 
							}}
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
						>
							OR NUMBER {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => (
				<div className="text-center">
					{row.original.or_no}
				</div>
			),
		},

		{
			accessorKey: 'created_at',
			sortingFn: "datetime",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => {
								column.toggleSorting(column.getIsSorted() === "asc"); 
							}}
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
						>
							CREATED AT {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => {
				const sched: any = row.getValue('created_at');
				if (sched.toString() !== '0000-00-00 00:00:00') {
					const details = { 
						year: 'numeric', 
						month: 'long', 
						day: 'numeric', 
						hour:'numeric',
						minute:'numeric' };
					const format = new Date(sched).toLocaleDateString([], details);
					return (
						<div className="text-center">{format}</div>
					);
				} else {
					return (
						<div className="text-center">N/A</div>
					);
				}
			},
		},

		{
			accessorKey: 'warehouse',
			header:	() => <div className="text-center">WAREHOUSE CODE</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.warehouse.code}</div>
			),
		},

		{
			id: 'customer',
			header:	() => <div className="text-center">CUSTOMER NAME</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.customer.firstname + " " + row.original.customer.lastname}</div>
			),
		},

		{
			accessorKey: 'type',
			sortingFn: "text",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => {
								column.toggleSorting(column.getIsSorted() === "asc"); 
							}}
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
						>
							TRANSACTION TYPE {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => (
				<div className="text-center">
					{row.original.type}
				</div>
			),
		},

		{
			accessorKey: 'status',
			header:	() => <div className="text-center">STATUS</div>,
			cell: ({ row }) => {
				return (
					<div className="flex mx-auto items-center justify-center">
						{
							row.original.status.toLowerCase() === 'approved' ? ( 
								<Check
									size={20}
									strokeWidth={2}
									className="text-green-600"
								/> 
							) : row.original.status.toLowerCase() === 'rejected' ? (
								<Ban
									size={20}
									strokeWidth={2}
									className="text-red-600"
								/>
							) : (
								<Clock
									size={20}
									strokeWidth={2}
									className="text-amber-500"
								/>
							)
						}
					</div>
				);
			},
		},

		{
			accessorKey: 'subtotal',
			header: () => { return (<div className="text-center"> SUBTOTAL </div>) },
			cell: ({ row }) => {
				const amount = row.original.subtotal;
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "PHP",
				}).format(amount);

				return (
					<div className="text-center">
						{formatted}
					</div>
				)
			},
		},

		{
			accessorKey: 'total_discount',
			header: () => { return (<div className="text-center"> TOTAL DISCOUNT </div>)},
			cell: ({ row }) => {
				const amount = row.original.total_discount;
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "PHP",
				}).format(amount);

				return (
					<div className="text-center">
						{formatted}
					</div>
				)
			},
		},

		{
			accessorKey: 'total_tax',
			header: () => { return (<div className="text-center"> TOTAL TAX </div>) },
			cell: ({ row }) => {
				const amount = row.original.total_tax;
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "PHP",
				}).format(amount);

				return (
					<div className="text-center">
						{formatted}
					</div>
				)
			},
		},

		{
			accessorKey: 'delivery_charge',
			header: () => { return (<div className="text-center"> DELIVERY CHARGE </div>)},
			cell: ({ row }) => {
				const amount = row.original.delivery_charge;
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "PHP",
				}).format(amount);

				return (
					<div className="text-center">
						{formatted}
					</div>
				)
			},
		},

		{
			accessorKey: 'total_amount_due',
			header: () => { return (<div className="text-center"> TOTAL AMOUNT DUE </div>)},
			cell: ({ row }) => {
				const amount = row.original.total_amount_due;
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "PHP",
				}).format(amount);

				return (
					<div className="text-center">
						{formatted}
					</div>
				)
			},
		},

		{
			accessorKey: 'paid_amount',
			header: () => { return (<div className="text-center"> PAID AMOUNT </div>)},
			cell: ({ row }) => {
				const amount = row.original.paid_amount;
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "PHP",
				}).format(amount);

				return (
					<div className="text-center">
						{formatted}
					</div>
				)
			},
		},

		{
			accessorKey: 'change_amount',
			header: () => { return (<div className="text-center"> CHANGE AMOUNT </div>) },
			cell: ({ row }) => {
				const amount = row.original.change_amount;
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "PHP",
				}).format(amount);

				return (
					<div className="text-center">
						{formatted}
					</div>
				)
			},
		},


		{
			accessorKey: 'payment_method',
			header: () => { return (<div className="text-center"> PAYMENT METHOD </div>) },
			cell: ({ row }) => (
				<div className="text-center">
					{row.original.payment_method || 'N/A'}
				</div>
			),
		},

		{
			accessorKey: 'reference_no',
			header: ({ column }) => {
				return (
					<div className="text-center">
						REF #
					</div>
				)
			},
			cell: ({ row }) => (
				<div className="text-center">
					{row.original.reference_no || '--'}
				</div>
			),
		},

		// {
		// 	id: 'amount_sales',
		// 	header:	() => <div className="text-center">TOTAL AMOUNT OF SALES</div>,
		// 	cell: ({ row }) => {
		// 		const total = row.original.invoices.reduce(
		// 			(total: number, invoice: Invoice) => 
		// 				total + invoice.total_amount_due
		// 			, 0);

		// 		const formatted = new Intl.NumberFormat("en-US", {
		// 				style: "currency",
		// 				currency: "PHP",
		// 			}).format(total);
				
		// 		return(
		// 			<div className="text-center">
		// 				{formatted}
		// 			</div>
		// 		);
		// 	},
		// },

	];

	return (
		<>
			<div className="flex max-w-4xl max-h-96 flex-col gap-4">
				<div className="overflow-x-hidden">
					<DataTable
						data={selectedInvoice}
						columns={ExpensesDetailsTableHeader}
						filterWhat={"or_no"}
						dataType={""}
						openModal={undefined}
						isLoading={isFetching} />
				</div>
			</div>
		</>
	);
};
