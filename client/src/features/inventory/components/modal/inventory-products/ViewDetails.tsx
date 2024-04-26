import { useInventoryProductsByInventory } from '@/features/inventory/context';

export const ViewDetails = () => {
	const { selectedInventoryProduct } = useInventoryProductsByInventory();

	return (
		<>
			<div className="flex max-w-2xl flex-col gap-2">
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-5">
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Name</h3>
						<p className="text-sm">
							{selectedInventoryProduct.product.name}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Brand</h3>
						<p className="text-sm capitalize">
							{selectedInventoryProduct.product.brand || (
								<span className="opacity-60">No brand</span>
							)}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Serial No</h3>
						<p className="text-sm">
							{selectedInventoryProduct.product.serial_no}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Size</h3>
						<p className="text-sm">
							{selectedInventoryProduct.product.size}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Color</h3>
						<p className="text-sm">
							{selectedInventoryProduct.product.color}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Unit</h3>
						<p className="text-sm">{selectedInventoryProduct.unit}</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Supplier</h3>
						<p className="text-sm">
							{selectedInventoryProduct.supplier_id.name}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-5">
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Capital Price
						</h3>
						<p className="text-sm">
							{Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'PHP',
							}).format(selectedInventoryProduct.capital_price)}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Stocks</h3>
						<p className="text-sm">
							{selectedInventoryProduct.stocks_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Damaged</h3>
						<p className="text-sm">
							{selectedInventoryProduct.damage_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Total</h3>
						<p className="text-sm">
							{selectedInventoryProduct.total_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Transferred
						</h3>
						<p className="text-sm">
							{selectedInventoryProduct.transferred_stocks_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Sold</h3>
						<p className="text-sm">
							{selectedInventoryProduct.sold_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Miscellaneous
						</h3>
						<p className="text-sm">
							{selectedInventoryProduct.miscellaneous_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Remaining Stocks
						</h3>
						<p className="text-sm">
							{selectedInventoryProduct.remaining_stocks_count}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-5">
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Status</h3>
						<p className="text-sm">
							{selectedInventoryProduct.status ? 'Approved' : 'Pending'}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Total approved stocks
						</h3>
						<p className="text-sm">
							{selectedInventoryProduct.approved_stocks}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Unapproved stocks
						</h3>
						<p className="text-sm">
							{selectedInventoryProduct.remaining_unapproved_stocks}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
