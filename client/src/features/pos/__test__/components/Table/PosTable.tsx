import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
	// const [columnVisibility, setColumnVisibility] = useState({
	// 	item_total_capital_price: false,
	// 	item_capital_price: false,
	// });

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		defaultColumn: {
			size: 200, //starting column size
			minSize: 50, //enforced during column resizing
			maxSize: 500, //enforced during column resizing
		},
		// state: {
		// 	columnVisibility,
		// },
		// onColumnVisibilityChange: setColumnVisibility,
	});
	return (
		<>
			{invoice === false && (
				<div className="flex w-full justify-end pb-2 pr-2">
					<div className="flex flex-row items-center gap-2">
						<Switch
							id="showCapital"
							onCheckedChange={table.getToggleAllColumnsVisibilityHandler()}
						/>
						<Label htmlFor="showCapital">Show capital prices</Label>
					</div>
				</div>
			)}
			<div className="rounded-md border">
				<Table>
					<TableHeader className="text-xs text-slate-700">
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead
											key={header.id}
											style={{
												width: `${header.getSize()}px`,
												fontWeight: 'bold',
											}}
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
					<TableBody className="text-xs">
						{table.getRowModel().rows?.length &&
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map(cell => (
										<TableCell
											key={cell.id}
											className="py-3 font-medium"
										>
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
