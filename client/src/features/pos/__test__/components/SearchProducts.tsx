import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Box, Boxes } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePos } from '../context/__test__/PosContext';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { useInventoryProds } from '@/features/inventory/context';
import { useProductPrices } from '@/features/product/__test__';
import { formatCurrency } from '@/utils/FormatCurrency';

interface SearchProductsProps {}

export const SearchProducts = ({}: SearchProductsProps) => {
	const [search, setSearch] = useState('');
	const { isLoading, productListing } = usePos();

	const { invoiceItemsQueue, setInvoiceItemsQueue, handleChange, invoice } =
		useInvoice();
	const { productInfo } = useProductPrices();
	const { data: inventoryProducts } = useInventoryProds();
	const total_amount_due = invoiceItemsQueue.reduce(
		(acc, currentItem) => acc + currentItem.total_price,
		0,
	);

	return (
		<div className="relative z-20 pb-10">
			<div className="absolute box-content flex w-full ">
				<Command className="rounded-lg border p-1 shadow-md">
					<CommandInput
						value={search}
						onValueChange={setSearch}
						placeholder={
							isLoading
								? 'Loading Products'
								: 'Enter Serial Number / Brand / Product Name'
						}
						disabled={productListing.length === 0}
					/>
					<CommandList className="">
						{!search ? null : (
							<>
								<CommandEmpty>Product Not Found</CommandEmpty>
								{productListing.map((item, index) => {
									const productInfo = inventoryProducts.find(
										inventory => inventory.product.id === item.id,
									);

									return (
										<CommandItem
											className="border-b border-slate-300"
											key={index}
											value={
												item.type === 'retail'
													? `${item.product.id} ${item.id} ${item.product.name} ${item.product.serial_no} ${item.product.brand} ${item.product.color} (Retail)`
													: `${item.product.id} ${item.id} ${item.product.name} ${item.product.serial_no} ${item.product.brand} ${item.product.color} (Wholesale)`
											}
											onSelect={() => {
												const selectedInvoiceItemIndex =
													invoiceItemsQueue.findIndex(
														invoiceItem =>
															invoiceItem.product_price_id ===
															item.id,
													);

												if (selectedInvoiceItemIndex !== -1) {
													const updatedSelectedProducts = [
														...invoiceItemsQueue,
													];
													updatedSelectedProducts[
														selectedInvoiceItemIndex
													].quantity++;
													setInvoiceItemsQueue(
														updatedSelectedProducts,
													);
													handleChange(
														'total_amount_due',
														total_amount_due
															? total_amount_due + item.price
															: item.price,
													);
												} else {
													setInvoiceItemsQueue([
														...invoiceItemsQueue,
														{
															unit: '',
															discount_approval_status: null,
															approved_by: null,
															item_discount: 0,
															invoice_id: null,
															product_id: {
																id: item.product.id,
																name: item.product.name,
																brand: item.product.brand,
																color: item.product.color,
																size: item.product.size,
																serial_no:
																	item.product.serial_no,
															},
															product_price_id: item.id,
															product_price: item.cost,
															total_price: item.price,
															quantity: 1,
															source_inventory:
																item.warehouse.id,
														},
													]);
													handleChange(
														'total_amount_due',
														total_amount_due
															? total_amount_due + item.price
															: item.price,
													);
												}
												setSearch('');
											}}
										>
											<div className="flex flex-1 flex-row justify-between">
												<div className="flex flex-col gap-2">
													<div className="flex flex-row gap-2">
														<span className="font-bold">
															{item.product.name}
														</span>
														<span className="font-medium">
															{item.product.size?.replace(
																'inch',
																'"',
															)}
														</span>
													</div>
													<div className="flex flex-row gap-1">
														{item.product.brand ? (
															<span className="text-[12px]">
																({item.product.brand})
															</span>
														) : (
															<span className="text-[12px]">
																(No Brand)
															</span>
														)}

														<span className="">
															• {item.product.color}
														</span>
														<span>
															• {productInfo?.stocks_count}
														</span>
													</div>
												</div>
												<div>
													<span className="font-bold ">
														{formatCurrency(item.price)}
													</span>
												</div>
											</div>
										</CommandItem>
									);
								})}
							</>
						)}
					</CommandList>
				</Command>
			</div>
		</div>
	);
};
