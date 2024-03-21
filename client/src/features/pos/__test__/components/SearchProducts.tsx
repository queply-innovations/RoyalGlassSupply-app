import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Box, Boxes } from 'lucide-react';
import { useState } from 'react';
import { usePos } from '../context/__test__/PosContext';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';

interface SearchProductsProps {}

export const SearchProducts = ({}: SearchProductsProps) => {
	const [search, setSearch] = useState('');
	const { isLoading, productListing } = usePos();

	const { invoiceItemsQueue, setInvoiceItemsQueue } = useInvoice();
	return (
		<div className="relative z-20 border pb-10">
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
									return (
										<CommandItem
											className=""
											key={index}
											value={
												item.type === 'retail'
													? `${item.product.id} ${item.id} ${item.product.name} ${item.product.serial_no} (Retail)`
													: `${item.product.id} ${item.id} ${item.product.name} ${item.product.serial_no} (Wholesale)`
											}
											onSelect={() => {
												const selectedInvoiceItemIndex =
													invoiceItemsQueue.findIndex(
														item =>
															item.product_id ===
															item.product_price_id,
													);
												if (selectedInvoiceItemIndex !== -1) {
													const updatedSelectedProducts = [
														...invoiceItemsQueue,
													];
													updatedSelectedProducts[
														selectedInvoiceItemIndex
													].quantity++;
												} else {
													setInvoiceItemsQueue([
														...invoiceItemsQueue,
														{
															unit: '',
															discount_approval_status: '',
															approved_by: 1,
															item_discount: 0,
															invoice_id: 1,
															product_id: {
																id: item.product.id,
																name: item.product.name,
															},
															product_price_id: item.id,
															product_price: item.cost,
															total_price: item.price,
															quantity: 1,
															source_inventory:
																item.warehouse.id,
														},
													]);
												}
												// if (selectedInvoiceItem !== -1) {
												// 	// If product already exists, update quantity
												// 	const updatedSelectedProducts = [
												// 		...invoiceItemsQueue,
												// 	];
												// 	updatedSelectedProducts[
												// 		selectedInvoiceItem
												// 	].quantity++;
												// 	setInvoiceItemsQueue(
												// 		updatedSelectedProducts,
												// 	);
												// } else {
												// 	// If product doesn't exist, add it
												// 	setInvoiceItemsQueue([
												// 		...invoiceItemsQueue,
												// 	]);
												// }
												setSearch('');
											}}
										>
											<div className="flex flex-1 flex-row justify-between">
												<div className="flex flex-row items-center gap-2">
													{item.type === 'retail' ? (
														<Box strokeWidth={1} />
													) : (
														<Boxes strokeWidth={1} />
													)}
													<span>{item.product.name}</span>
													<span className="text-xs text-gray-600 ">
														{`(${item.type} ${item.warehouse.code}) ${item.stocks_quantity}`}
													</span>
												</div>
												<div>
													<span>₱ {item.price}</span>
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
