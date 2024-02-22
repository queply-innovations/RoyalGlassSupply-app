import * as React from "react";
import { Button, Inputbox, Pagination, ProgressBar } from "@/components";

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
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	filterWhat: string
	dataType: string
	openModal: any
}

export function DataTable<TData, TValue>({
	columns,
	data,
	filterWhat,
	dataType,
	openModal,
	}: DataTableProps<TData, TValue>) {
		const [sorting, setSorting] = React.useState<SortingState>([]);

		const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
			[]
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
		})
		
		const placeholderLabel = `Filter ${filterWhat}...`;

		// TODO: Clean Pagination props and Modal contexts
		// In line with inserting changes in dev-frontend branch
		// (Careful on the Context and Provider)

		return (
			<>
			<div className="flex p-4 justify-between">
				<div className="w-1/2">
					<Inputbox
						placeholder={placeholderLabel}
						value={(table.getColumn(filterWhat)?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn(filterWhat)?.setFilterValue(event.target.value)
						}
						variant={"searchbar"}
						buttonIcon={"outside"}
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
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
							<TableHead key={header.id} className="text-center py-5 text-xs font-bold uppercase">
								{header.isPlaceholder
								? null
								: flexRender(
									header.column.columnDef.header,
									header.getContext()
									)}
							</TableHead>
							)
						})}
						</TableRow>
					))}
					</TableHeader>
					<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
							className="py-2 text-xs font-normal uppercase text-center"
						>
							{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
							))}
						</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center px-20">
								No results. 
								{/* TODO: Find ways to enhance loading state 
								while waiting for first time data to load */}
							</TableCell>
						</TableRow>
					)}
					</TableBody>
				</Table>
			</div>
			<div className="flex flex-row justify-between space-x-2 py-4">
				<div className="font-semibold p-4">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
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
		)
}