import * as React from 'react';
import { Button, Inputbox, Pagination2 } from '@/components';

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
import { Loader2, Plus, Printer } from 'lucide-react';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	filterWhat: string;
	dataType: string;
	openModal?: () => void;
	isLoading?: boolean;
	hidePagination?: boolean;
	hideFilter?: boolean;
	autoResetPageIndex?: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	filterWhat,
	dataType,
	openModal,
	isLoading,
	hidePagination,
	hideFilter,
	autoResetPageIndex = false,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);

	// ! This code below calls the openModal function,
	// ! making some pages to open the modal when DataTable is mounted
	// ! Check other pages that use DataTable and see if error occurs opening modal
	// ? const modalHandler = openModal();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		enableSortingRemoval: false,
		state: {
			sorting,
			columnFilters,
		},
		autoResetPageIndex: autoResetPageIndex,
	});

	const label =
		(filterWhat.split('_')[0] === 'or' ? 'OR' : filterWhat.split('_')[0]) +
		' ' +
		(filterWhat.split('_')[1] === 'no'
			? 'number'
			: filterWhat.split('_')[1]
				? filterWhat.split('_')[1]
				: '');

	const placeholderLabel = `Filter ${label.trim()}...`;

	return (
		<div className="flex max-h-full flex-col divide-y">
			{!hideFilter && (
				<div className="flex flex-none justify-between p-4">
					{hideFilter ? null : (
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
					)}
					{/* Made this render conditionally, so that if
							no openModal prop passed, this would not render.
							Useful for view-only table. */}
					{openModal && (
						<div className="flex flex-row-reverse">
							<Button
								fill={'green'}
								onClick={openModal}
								disabled={isLoading}
								className="flex h-8 flex-row items-center pl-2 pr-3 disabled:cursor-not-allowed disabled:opacity-40"
							>
								<Plus size={26} strokeWidth={2} /> {`Add ${dataType}`}
							</Button>
						</div>
					)}
				</div>
			)}
			<Table className="flex-1 overflow-auto">
				<TableHeader className="z-10 bg-slate-50 hover:bg-slate-50">
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<TableHead
										key={header.id}
										className="text-xs font-bold uppercase text-slate-800"
									>
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
								className="text-xs font-medium text-slate-950"
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
						<TableRow className="hover:bg-white">
							<TableCell
								colSpan={columns.length}
								className="h-24 items-center justify-center space-y-0 px-20 text-center"
							>
								<div className="flex items-center justify-center text-slate-800/60">
									<Loader2
										size={28}
										strokeWidth={2}
										className="animate-spin"
									/>
								</div>
							</TableCell>
						</TableRow>
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center font-medium hover:bg-white"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{hidePagination ? null : (
				<div className="flex flex-none flex-row items-center justify-between p-4">
					<div className="text-sm font-semibold">
						{table.getFilteredSelectedRowModel().rows?.length > 0 ? (
							<>
								{table.getFilteredSelectedRowModel().rows?.length} of{' '}
								{table.getFilteredRowModel().rows?.length} row(s)
								selected
							</>
						) : (
							<>
								{table.getFilteredRowModel().rows?.length}{' '}
								{table.getFilteredRowModel().rows?.length !== 1
									? 'rows'
									: 'row'}
							</>
						)}
					</div>

					<div>
						<Pagination2
							onClickPrev={() => table.previousPage()}
							onClickNext={() => table.nextPage()}
							table={table}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
