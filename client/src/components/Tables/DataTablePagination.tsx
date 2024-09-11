import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import {
	ArrowLeft,
	ArrowLeftToLine,
	ArrowRight,
	ArrowRightToLine,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

export interface DataTablePaginationProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	rowCount: number;
}

export interface DataTablePaginationProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	rowCount: number;
	pageCount: number;
	pagination: PaginationState;
	setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
	sorting?: SortingState;
	setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
	isLoading?: boolean; // Loading is for initial data fetch
	isFetching?: boolean;
	from?: number;
	to?: number;
}

export const DataTablePagination = <TData, TValue>({
	columns,
	data,
	rowCount,
	pageCount,
	pagination,
	setPagination,
	sorting,
	setSorting,
	from,
	to,
	isLoading,
	isFetching,
}: DataTablePaginationProps<TData, TValue>) => {
	// Table instance and options
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: !(sorting && setSorting)
			? getSortedRowModel() // Use default sorting if sorting state is not provided
			: undefined,
		manualPagination: true,
		rowCount: rowCount,
		state: {
			pagination,
			sorting,
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		manualSorting: !!sorting && !!setSorting, // Allow manual sorting if sorting state is provided
		enableMultiSort: false,
	});

	// Page input state
	const [pageInput, setPageInput] = useState<string>(
		(pagination.pageIndex + 1).toString(),
	);
	// Set page input value state when pagination changes
	useEffect(() => {
		setPageInput((pagination.pageIndex + 1).toString());
	}, [pagination.pageIndex]);

	return (
		<div className="flex max-h-full flex-col divide-y">
			<div className="relative flex flex-1 overflow-auto">
				{/* Block table with invisible div when fetching */}
				<div
					className={`absolute z-10 h-full w-full cursor-progress ${!isFetching && 'hidden'}`}
				></div>

				<Table className={`text-xs ${isFetching && 'opacity-50'}`}>
					<TableHeader className="z-10 bg-slate-50 hover:bg-slate-50">
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id} className="py-3">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : isLoading ? (
							// Show skeleton loader when loading
							[...Array(pagination.pageSize)].map((_, index) => (
								<TableRow key={index}>
									<TableCell
										colSpan={columns.length}
										className="animate-pulse"
									>
										<div className="h-5 rounded bg-slate-300/50"></div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex flex-none flex-row items-center justify-between p-4 text-sm">
				<div className="flex items-center gap-4">
					{/* Page size select component */}
					<Select
						onValueChange={value =>
							// Reset to first page to avoid out-of-bounds
							setPagination({ pageIndex: 0, pageSize: Number(value) })
						}
						value={pagination.pageSize.toString()}
					>
						<SelectTrigger className="w-[100px]">
							<SelectValue placeholder={pagination.pageSize} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="25">25 rows</SelectItem>
							<SelectItem value="50">50 rows</SelectItem>
							<SelectItem value="75">75 rows</SelectItem>
							<SelectItem value="100">100 rows</SelectItem>
						</SelectContent>
					</Select>

					{from && to ? (
						<span>
							{from} - {to} of {rowCount} items
						</span>
					) : (
						<span>
							{rowCount === 1 ? `${rowCount} item` : `${rowCount} items`}
						</span>
					)}
				</div>

				<div className="flex items-center gap-4">
					<div className="mr-6 space-x-2">
						{/* Input to navigate to page */}
						<form
							onSubmit={e => {
								e.preventDefault();
								const target = e.target as HTMLFormElement;
								table.setPageIndex(target['pageInput'].value - 1);
							}}
							className="inline-block"
						>
							<Input
								id="pageInput"
								type="number"
								min={1}
								max={pageCount}
								step={1}
								className=" w-[7ch] flex-1 px-2 text-center"
								value={pageInput}
								disabled={isLoading || isFetching}
								onChange={e => setPageInput(e.target.value)}
								onBlur={e => {
									e.target.value = (
										pagination.pageIndex + 1
									).toString();
								}}
							/>
						</form>

						<span>of {pageCount}</span>
					</div>

					<div className="space-x-1">
						<Button
							variant="outline"
							onClick={() => table.firstPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<ArrowLeftToLine size={16} />
						</Button>

						<Button
							variant="outline"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<ArrowLeft size={16} />
						</Button>
					</div>

					<div className="space-x-1">
						<Button
							variant="outline"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<ArrowRight size={16} />
						</Button>

						<Button
							variant="outline"
							onClick={() => table.lastPage()}
							disabled={!table.getCanNextPage()}
						>
							<ArrowRightToLine size={16} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
