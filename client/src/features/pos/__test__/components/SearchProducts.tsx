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
import { useInventoryProds } from '@/features/inventory/context';
import { useProductPrices } from '@/features/product/__test__';

interface SearchProductsProps {}

export const SearchProducts = ({}: SearchProductsProps) => {
	const [search, setSearch] = useState('');
	const { isLoading, productListing } = usePos();

	const { invoiceItemsQueue, setInvoiceItemsQueue } = useInvoice();
	const { productInfo } = useProductPrices();
	const { data: inventoryProducts } = useInventoryProds();

	return (
		<div className="relative z-20 pb-10">
			<div className="box-content absolute flex w-full ">
				<Command className="p-1 border rounded-lg shadow-md">
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
											className=""
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
												}
												setSearch('');
											}}
										>
											<div className="flex flex-row justify-between flex-1">
												<div className="flex flex-row items-center gap-2">
													{item.product.brand ? (
														<span className="text-[10px] font-light">
															({item.product.brand})
														</span>
													) : null}
													<span className="font-medium">
														{item.product.name}
													</span>

													<span className="font-light">
														{item.product.size?.replace(
															'inch',
															'"',
														)}
													</span>
													<span className="font-extralight">
														{item.product.color}
													</span>
												</div>
												<div>
													<span>₱{item.price}</span>
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
