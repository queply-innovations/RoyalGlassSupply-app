import * as React from 'react';
import { Button, Inputbox, Pagination } from '@/components';

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	filterWhat: string;
	dataType: string;
	openModal: any;
	isLoading?: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	filterWhat,
	dataType,
	openModal,
	isLoading,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	const placeholderLabel = `Filter ${filterWhat}...`;

	// TODO: Clean Pagination props and Modal contexts
	// In line with inserting changes in dev-frontend branch
	// (Careful on the Context and Provider)

	// TODO: Maybe add sizing for table columns using column sizing APIs

	return (
		<>
			<div className="flex justify-between p-4">
				<div className="w-1/2">
					<Inputbox
						placeholder={placeholderLabel}
						value={
							(table
								.getColumn(filterWhat)
								?.getFilterValue() as string) ?? ''
						}
						onChange={event =>
							table
								.getColumn(filterWhat)
								?.setFilterValue(event.target.value)
						}
						variant={'searchbar'}
						buttonIcon={'outside'}
					/>
				</div>
				<div className="flex flex-row-reverse gap-3">
					<Button fill={'green'} onClick={openModal}>
						{`Add ${dataType}`}
					</Button>
				</div>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
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
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : isLoading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Loading...
								</TableCell>
							</TableRow>
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
			<div className="flex flex-row justify-between space-x-2 py-4">
				<div className="p-4 font-semibold">
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>

				<div>
					<Pagination
						onClickPrev={() => table.previousPage()}
						onClickNext={() => table.nextPage()}
						table={table}
					/>
				</div>
			</div>
		</>
	);
}
