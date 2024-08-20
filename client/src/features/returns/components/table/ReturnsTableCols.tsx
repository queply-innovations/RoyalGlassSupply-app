import { ColumnDef } from '@tanstack/react-table';
import { ReturnTransactions } from '../../types';
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
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	Boxes,
	MoreVertical,
	Ban,
	CheckCircle,
	Clock,
} from 'lucide-react';

interface ReturnsTableColsProps {
	handleViewItems: (returnTransactionId: number) => void;
}

export const ReturnsTableCols = ({
	handleViewItems,
}: ReturnsTableColsProps) => {
	const columnDefinition: ColumnDef<ReturnTransactions>[] = [
		{
			accessorKey: 'code',
			sortingFn: 'text',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row items-center bg-transparent uppercase text-slate-700"
						>
							Code{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp strokeWidth={2} />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown strokeWidth={2} />
							) : (
								<ArrowUpDown strokeWidth={2} />
							)}
						</Button>
					</div>
				);
			},
		},
		{
			accessorKey: 'invoice.code',
			sortingFn: 'text',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row items-center bg-transparent uppercase text-slate-700"
						>
							Invoice code{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp strokeWidth={2} />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown strokeWidth={2} />
							) : (
								<ArrowUpDown strokeWidth={2} />
							)}
						</Button>
					</div>
				);
			},
		},

		{
			accessorKey: 'refundable_amount',
			header: () => (
				<div className="justify-center uppercase">Refundable</div>
			),
			cell: ({ row }) => {
				return (
					<div className="uppercase">
						<span className="max-w-[25ch] truncate">
							{Intl.NumberFormat('en-PH', {
								style: 'currency',
								currency: 'PHP',
							}).format(row.original.refundable_amount)}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'issued_by',
			header: () => (
				<div className="justify-center uppercase">Issued by</div>
			),
			cell: ({ row }) => {
				return (
					<div>
						<span>
							{row.original.issued_by
								? `${row.original.issued_by.firstname} ${row.original.issued_by.lastname}`
								: '—'}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'created_at',
			header: () => (
				<div className="justify-center uppercase">Processed at</div>
			),
			cell: ({ row }) => {
				return (
					<div>
						<span className="max-w-[25ch] truncate">
							{Intl.DateTimeFormat('en-PH', {
								year: 'numeric',
								month: 'long',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit',
								hour12: true,
							}).format(new Date(row.original.created_at))}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'refund_status',
			header: () => <div className="justify-center uppercase">Status</div>,
			cell: ({ row }) => {
				const status = row.original.refund_status;
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="flex items-center">
								{status === 'done' ? (
									<CheckCircle
										size={18}
										strokeWidth={2.25}
										className="text-green-700"
									/>
								) : status === 'denied' ? (
									<Ban
										size={18}
										strokeWidth={2.25}
										className="text-red-700"
									/>
								) : (
									<Clock
										size={18}
										strokeWidth={2.25}
										className="text-yellow-600"
									/>
								)}
							</TooltipTrigger>
							<TooltipContent>
								<p className="text-sm font-medium capitalize">
									{status}
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			},
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<DropdownMenu>
							<DropdownMenuTrigger className="overflow-clip rounded-full bg-gray-100 p-1.5 hover:bg-gray-300">
								<MoreVertical size={16} strokeWidth={2.25} />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="relative z-50 w-44 bg-white">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-gray-200" />
								<DropdownMenuItem
									onClick={() => {
										handleViewItems(row.original.id);
									}}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<Boxes size={16} strokeWidth={2} />
									</span>
									<span>View items</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
			enableGlobalFilter: false,
		},
	];

	return columnDefinition;
};
