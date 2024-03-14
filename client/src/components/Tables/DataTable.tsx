import * as React from 'react';
import { Button, Inputbox, Pagination, ProgressBar } from '@/components';

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
import { Loader2, Plus } from 'lucide-react';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	filterWhat: string;
	dataType: string;
	openModal: () => void;
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
				{dataType && (
					<div className="flex flex-row items-end gap-3">
						<Button
							fill={'green'}
							onClick={openModal}
							disabled={isLoading}
							className="disabled:cursor-not-allowed disabled:opacity-40 flex flex-row h-8 items-center"
						>
							<Plus size={26} strokeWidth={2} /> {`Add ${dataType}`}
						</Button>
					</div>
				)}
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead
											key={header.id}
											className="py-5 text-xs font-bold uppercase text-black"
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
									className="py-2 text-xs font-normal uppercase text-slate-900"
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
					{table.getFilteredSelectedRowModel().rows?.length} of{' '}
					{table.getFilteredRowModel().rows?.length} row(s) selected.
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
