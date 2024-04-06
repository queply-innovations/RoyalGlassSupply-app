import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { useProductPrices } from '@/features/product/__test__';
import { formatCurrency } from '@/utils/FormatCurrency';

export const ReturnTable = () => {
	const tableCols = ['', 'Product name', 'Price', 'Qty', 'Total'];
	const { selectedInvoiceCode } = useInvoice();
	const { data: productPrices } = useProductPrices();

	// useEffect(() => {
	// 	if (selectedInvoiceCode === undefined) {
	// 		setSelectedInvoiceCode(state.invoice);
	// 		setInvoiceCodeResult(true);
	// 	}
	// }, [state, selectedInvoiceCode]);
	console.log(selectedInvoiceCode);
	return (
		<>
			<Table>
				<TableCaption>
					Select items the customer wants to return for invoice{' '}
				</TableCaption>
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
									className="whitespace-nowrap px-5 py-3 text-left text-xs font-bold uppercase"
								>
									{colName}
								</TableHead>
							);
						})}
					</TableRow>
				</TableHeader>
				<TableBody>
					{selectedInvoiceCode.invoice_items.length > 0 &&
						selectedInvoiceCode.invoice_items.map((row, index) => {
							return (
								<TableRow
									key={row?.id + 'row'}
									className="text-sm font-medium text-gray-700"
								>
									<TableCell className="p-3 pr-0">
										<input
											type="checkbox"
											className="h-4 w-4"
											name="return"
											id="return"
										/>
									</TableCell>
									<TableCell
										key={row?.product.name + 'Product Name'}
										className="text-sm font-medium text-gray-700"
									>
										{row?.product.name}
									</TableCell>
									<TableCell>
										<div className="flex flex-row gap-2">
											<span>
												{formatCurrency(
													productPrices.find(
														item =>
															item.id === row.product_price_id,
													)!.cost,
												)}
											</span>

											{productPrices.find(
												item => item.id === row.product_price_id,
											)!.on_sale ? (
												<span className="text-muted-foreground">
													(
													{formatCurrency(
														productPrices.find(
															item =>
																item.id ===
																row.product_price_id,
														)!.sale_discount,
													)}
													)
												</span>
											) : null}
										</div>
									</TableCell>
									<TableCell>{row?.quantity}</TableCell>
									<TableCell>
										{formatCurrency(row?.total_price)}
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={4} className="text-right">
							Total:
						</TableCell>
						<TableCell>
							{formatCurrency(selectedInvoiceCode.paid_amount)}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	);
};
