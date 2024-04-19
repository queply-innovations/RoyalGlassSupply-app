import { DropdownMenuSeparator } from '@/components/DropdownMenu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Row } from 'react-day-picker';

interface PosTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	invoice?: boolean;
}

export function PosTable<TData, TValue>({
	columns,
	data,
	invoice,
}: PosTableProps<TData, TValue>) {
	var total = 0;
	if (invoice) {
		total = data.reduce((acc: number, cur: any) => {
			acc += cur.total_price;
			return acc;
		}, 0);
	}
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		defaultColumn: {
			size: 200, //starting column size
			minSize: 50, //enforced during column resizing
			maxSize: 500, //enforced during column resizing
		},
	});
	return (
		<>
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<TableHead
										key={header.id}
										style={{
											width: header.index === 0 ? 250 : 500,
										}}
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
					{table.getRowModel().rows?.length &&
						table.getRowModel().rows.map(row => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)}
									</TableCell>
								))}
							</TableRow>
						))}

					{invoice && (
						<>
							<TableRow>
								<TableCell colSpan={3}></TableCell>
								<TableCell colSpan={2} key="total_cost">
									<div className="flex justify-center">
										<span className="text-lg font-semibold">
											Total: { Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'PHP',
												}).format(total) }
										</span>
									</div>
								</TableCell>
							</TableRow>
						</>
					)}
				</TableBody>
			</Table>
		</div>

		{invoice && (
			<div className="flex flex-col gap-2">
				<hr className="col-span-12 my-2 h-px w-full border-0 bg-gray-800" />
				<div className="flex flex-row text-base justify-between mx-10">
					<p>Issued by:</p>
					<p>Prepared by:</p>
					<p>Released/checked by:</p>
				</div>
			</div>
		)}
		</>
	);
}
