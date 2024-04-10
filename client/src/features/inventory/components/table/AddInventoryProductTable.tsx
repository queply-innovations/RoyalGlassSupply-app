import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Product } from '@/features/product/__test__/types';
import { Supplier } from '@/features/supplier/types';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { InventoryProductsQueueProps } from '../modal/AddInventoryProduct';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import {
	CheckCircle,
	Clock,
	MoreVertical,
	PackageMinus,
	Pencil,
} from 'lucide-react';
import { Button as LegacyButton } from '@/components';
import { useState } from 'react';
import {
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Tooltip } from '@radix-ui/react-tooltip';
import { toast } from 'react-toastify';

const tableCols = [
	'',
	'Product name',
	'Supplier',
	'Status',
	'Capital price',
	'Unit',
	'Stocks',
	'Damaged',
	'Total',
];

interface AddInventoryProductTableProps {
	data: InventoryProductsQueueProps[];
	products: Product[];
	suppliers: Supplier[];
	handleEditItem: (item: InventoryProductsQueueProps) => void;
	handleRemoveItem: (id: number) => void;
	handleSubmit: (
		args: any,
	) => Promise<number[] | { status: number; data: any }>;
	onClose: () => void;
}

export const AddInventoryProductTable = ({
	data,
	products,
	suppliers,
	handleEditItem,
	handleRemoveItem,
	handleSubmit,
	onClose,
}: AddInventoryProductTableProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submitItems = () => {
		setIsSubmitting(true);
		handleSubmit({
			action: 'batch-add',
			data: data.map(item => item?.data),
		})
			.then(() => {
				toast.success('Items added to inventory');
				setIsSubmitting(false);
				onClose();
			})
			.catch(() => {
				toast.error('Error adding items to inventory');
				setError('Error adding items to inventory');
				setIsSubmitting(false);
			});
	};

	return (
		<>
			<div className="relative flex h-full flex-col">
				<TooltipProvider>
					<ScrollArea
						type="always"
						className="flex-1 rounded-md border border-gray-200 bg-white"
						style={{ '--border': '216 12% 84%' } as React.CSSProperties} // to change the color of the scrollbar
					>
						{data.length <= 0 && (
							<div className="absolute z-10 flex h-full w-full items-center justify-center">
								<p className="text-lg font-medium text-gray-500/50">
									No items in queue
								</p>
							</div>
						)}
						<ScrollBar orientation="horizontal" className="z-50 h-3" />
						<ScrollBar
							orientation="vertical"
							className="z-50 h-3"
							style={
								{
									'--border': '216 12% 84%',
								} as React.CSSProperties
							}
							asChild
						/>
						<Table>
							<TableHeader>
								<TableRow
									key={'tHeaderRow'}
									id={'tHeaderRow'}
									className="hover:bg-white"
								>
									{tableCols.map(colName => {
										return (
											<TableHead
												key={colName + '_head'}
												className="whitespace-nowrap px-5 py-3 text-center text-xs font-bold uppercase"
											>
												{colName}
											</TableHead>
										);
									})}
								</TableRow>
							</TableHeader>
							<TableBody className="[&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-gray-50">
								{data.length > 0 &&
									data.map(row => {
										return (
											<TableRow
												key={row?.id + 'row'}
												className="text-sm font-medium text-gray-700"
											>
												<TableCell
													className="p-3 pr-0"
													key={row?.id + 'action'}
												>
													<div className="flex flex-row justify-center text-xs font-normal uppercase">
														<DropdownMenu>
															<DropdownMenuTrigger className="overflow-clip rounded-full bg-gray-200/70 p-1.5 hover:bg-gray-300">
																<MoreVertical
																	size={16}
																	strokeWidth={2.25}
																/>
															</DropdownMenuTrigger>
															<DropdownMenuContent className="relative z-50 w-44 bg-white font-medium">
																<DropdownMenuLabel>
																	Actions
																</DropdownMenuLabel>
																<DropdownMenuSeparator className="bg-gray-200" />
																<DropdownMenuItem
																	key={row?.id + 'edit'}
																	onClick={() => {
																		row?.id
																			? handleEditItem(row)
																			: null;
																	}}
																	className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
																>
																	<span className="flex w-6 items-center justify-center">
																		<Pencil
																			size={16}
																			strokeWidth={2}
																		/>
																	</span>
																	<span>Edit</span>
																</DropdownMenuItem>
																<DropdownMenuItem
																	key={row?.id + 'remove'}
																	onClick={() => {
																		row?.id
																			? handleRemoveItem(
																					row.id,
																				)
																			: null;
																	}}
																	className="flex flex-row items-center gap-3 rounded-md p-2 focus:bg-red-50 focus:text-red-700"
																>
																	<span className="flex w-6 items-center justify-center">
																		<PackageMinus
																			size={16}
																			strokeWidth={2}
																		/>
																	</span>
																	<span>Remove</span>
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</TableCell>
												<TableCell
													className="max-w-[200px] truncate px-5 py-3"
													key={row?.id + 'product_id'}
												>
													{row?.data.product_id
														? products.find(
																product =>
																	product.id ===
																	row.data.product_id,
															)?.name
														: row?.data.product_id}
												</TableCell>
												<TableCell
													className="max-w-[200px] truncate px-5 py-3"
													key={row?.id + 'supplier_id'}
												>
													{row?.data.supplier_id
														? suppliers.find(
																suppier =>
																	suppier.id ===
																	row.data.supplier_id,
															)?.name
														: row?.data.supplier_id}
												</TableCell>
												<TableCell
													className="px-5 py-3"
													key={row?.id + 'status'}
												>
													<Tooltip>
														<TooltipTrigger>
															{!!row?.data.status ? (
																<CheckCircle
																	size={20}
																	strokeWidth={2}
																	className="text-green-600"
																/>
															) : (
																<Clock
																	size={20}
																	strokeWidth={2}
																	className="text-gray-600"
																/>
															)}
														</TooltipTrigger>
														<TooltipContent>
															<p className="text-sm font-medium normal-case">
																{!!row.data.status
																	? 'Approved'
																	: 'Pending'}
															</p>
														</TooltipContent>
													</Tooltip>
												</TableCell>
												<TableCell
													className="px-5 py-3"
													key={row?.id + 'capital_price'}
												>
													{Intl.NumberFormat('en-US', {
														style: 'currency',
														currency: 'PHP',
													}).format(row?.data.capital_price || 0)}
												</TableCell>
												<TableCell
													className="px-5 py-3"
													key={row?.id + 'unit'}
												>
													{row?.data.unit}
												</TableCell>
												<TableCell
													className="px-5 py-3"
													key={row?.id + 'stocks_count'}
												>
													{row?.data.stocks_count}
												</TableCell>
												<TableCell
													className="px-5 py-3"
													key={row?.id + 'damage_count'}
												>
													{row?.data.damage_count}
												</TableCell>
												<TableCell
													className="px-5 py-3"
													key={row?.id + 'total_count'}
												>
													{row?.data.total_count}
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</ScrollArea>
					<div className="flex w-full justify-between whitespace-nowrap pt-6">
						{error && (
							<div className="flex w-full flex-row items-center justify-start gap-4">
								<p className="text-sm font-bold text-red-600">
									{error}
								</p>
							</div>
						)}
						<div className="ml-auto flex flex-row gap-4">
							<LegacyButton
								fill={'default'}
								type="reset"
								onClick={() => onClose()}
								className="flex-1 py-2 text-sm font-bold text-slate-700 hover:text-white"
							>
								Cancel
							</LegacyButton>
							<LegacyButton
								type="submit"
								fill={'green'}
								disabled={data.length <= 0 || isSubmitting} // Disable button if no item in list
								className="max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
								onClick={e => {
									e.preventDefault();
									submitItems();
								}}
							>
								{data.length <= 1
									? 'Add item to inventory'
									: `Add ${data.length} items to inventory`}
							</LegacyButton>
						</div>
					</div>
				</TooltipProvider>
			</div>
		</>
	);
};
