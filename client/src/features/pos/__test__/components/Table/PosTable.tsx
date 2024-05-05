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
	subtotal?: number;
	discount?: number;
	deliveryCharge?: number;
	totalDue?: number;
	amountPaid?: number;
}

export function PosTable<TData, TValue>({
	columns,
	data,
	invoice,
	subtotal,
	discount,
	deliveryCharge,
	totalDue,
	amountPaid,
}: PosTableProps<TData, TValue>) {
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
											style={{ width: `${header.getSize()}px` }}
											className={``}
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
										<TableCell key={cell.id} className="py-3">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))}

						{invoice && subtotal && (
							<>
								<TableRow>
									<TableCell
										key={'subtotal-label'}
										colSpan={4}
										className="py-2 text-xs font-medium"
									>
										<span className="flex w-full justify-end">
											Subtotal
										</span>
									</TableCell>
									<TableCell
										colSpan={1}
										key={'subtotal-value'}
										className="py-2"
									>
										<span className="text-left text-xs">
											{Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'PHP',
											}).format(subtotal)}
										</span>
									</TableCell>
								</TableRow>
							</>
						)}

						{invoice && discount && (
							<>
								<TableRow>
									<TableCell
										colSpan={4}
										key={'discount-label'}
										className="py-2 text-xs font-medium"
									>
										<span className="flex w-full justify-end">
											Discount
										</span>
									</TableCell>
									<TableCell
										colSpan={1}
										key={'discount-value'}
										className="py-2"
									>
										<span className="text-left text-xs">
											{Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'PHP',
											}).format(discount)}
										</span>
									</TableCell>
								</TableRow>
							</>
						)}

						{invoice && deliveryCharge && (
							<>
								<TableRow>
									<TableCell
										colSpan={4}
										key={'deliveryCharge-label'}
										className="py-2 text-xs font-medium"
									>
										<span className="flex w-full justify-end">
											Delivery fee
										</span>
									</TableCell>
									<TableCell
										colSpan={1}
										key={'deliveryCharge-value'}
										className="py-2"
									>
										<span className="text-left text-xs">
											{Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'PHP',
											}).format(deliveryCharge)}
										</span>
									</TableCell>
								</TableRow>
							</>
						)}

						{invoice && totalDue && (
							<>
								<TableRow>
									<TableCell
										colSpan={4}
										key={'totalDue-label'}
										className="py-2 text-xs font-bold"
									>
										<span className="flex w-full justify-end">
											Total
										</span>
									</TableCell>
									<TableCell
										colSpan={1}
										key={'totalDue-value'}
										className="py-2"
									>
										<span className="text-left text-xs font-bold">
											{Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'PHP',
											}).format(totalDue)}
										</span>
									</TableCell>
								</TableRow>
							</>
						)}

						{invoice && amountPaid && (
							<>
								<TableRow>
									<TableCell
										colSpan={4}
										key="amountPaid-label"
										className="py-2 text-xs font-medium"
									>
										<span className="flex w-full justify-end">
											Amount paid
										</span>
									</TableCell>
									<TableCell
										colSpan={1}
										key="amountPaid-value"
										className="py-2"
									>
										<span className="text-left text-xs">
											{Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'PHP',
											}).format(amountPaid)}
										</span>
									</TableCell>
								</TableRow>
							</>
						)}
					</TableBody>
				</Table>
			</div>

			{invoice && (
				<div className="flex flex-col gap-2">
					<hr className="col-span-12 h-px w-full border-0 bg-gray-800" />
					<div className="mt-4 grid grid-cols-3 text-xs">
						<p>Issued by:</p>
						<p>Prepared by:</p>
						<p>Released/checked by:</p>
					</div>
				</div>
			)}
		</>
	);
}
