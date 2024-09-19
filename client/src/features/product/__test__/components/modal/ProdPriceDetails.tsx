import { formatUTCDate } from '@/utils/timeUtils';
import { Check, X } from 'lucide-react';
import currency from 'currency.js';
import { useProductPricesPaginated } from '../../context/ProductPricesPaginatedContext';
import { useProductPrices } from '../../context/ProductPricesContext';

export const ProdPriceDetails = () => {
	// const { selectedProductPrice } = useProductPricesPaginated();
	const { selectedProductPrice } = useProductPrices();

	// return (
	// 	<>
	// 		<div className="flex max-w-2xl flex-col gap-4 font-medium">
	// 			<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-x-6 gap-y-4">
	// 				<div className="col-span-3 flex flex-col justify-center gap-1">
	// 					<h3 className="text-sm font-bold">Name</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{selectedProductPrice?.product.name ?? 'No name'}
	// 					</p>
	// 				</div>
	// 				<div className="col-span-3 flex flex-col justify-center gap-1">
	// 					<h3 className="text-sm font-bold">Brand</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{selectedProductPrice?.product.brand || 'No brand'}
	// 					</p>
	// 				</div>
	// 				<div className="col-span-6 flex flex-col justify-center gap-1">
	// 					<h3 className="text-sm font-bold">Serial number</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{selectedProductPrice?.product.serial_no ??
	// 							'No serial number'}
	// 					</p>
	// 				</div>
	// 				<div className="col-span-3 flex flex-col justify-center	gap-1">
	// 					<h3 className="text-sm font-bold">Unit</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{selectedProductPrice?.inventory_product.unit ?? 'No unit'}
	// 					</p>
	// 				</div>
	// 				<div className="col-span-3 flex flex-col justify-center gap-1">
	// 					<h3 className="text-sm font-bold">Size</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{selectedProductPrice?.product.size ?? 'No size'}
	// 					</p>
	// 				</div>
	// 				<div className="col-span-3 flex flex-col justify-center gap-1">
	// 					<h3 className="text-sm font-bold">Color</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{selectedProductPrice?.product.color ?? 'No color'}
	// 					</p>
	// 				</div>
	// 				<div className="col-span-3 flex flex-col justify-center	gap-1">
	// 					<h3 className="text-sm font-bold">Inventory</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{selectedProductPrice?.inventory_product.inventory.code ??
	// 							'No inventory'}
	// 					</p>
	// 				</div>
	// 			</div>
	// 			<hr className="my-2 h-px w-full border-0 bg-gray-200" />
	// 			<div className="grid w-full grid-flow-row grid-cols-6 gap-x-6 gap-y-4">
	// 				<div className="relative col-span-2 flex flex-col justify-center	gap-1">
	// 					<h3 className="text-sm font-bold">Capital price</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{Intl.NumberFormat('en-US', {
	// 							style: 'currency',
	// 							currency: 'PHP',
	// 						}).format(selectedProductPrice?.capital_price ?? 0)}
	// 					</p>
	// 				</div>
	// 				<div className="col-span-2 flex flex-col justify-center	gap-1">
	// 					<h3 className="text-sm font-bold">Markup percent</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{
	// 							currency(
	// 								((selectedProductPrice?.markup_price ?? 0) /
	// 									(selectedProductPrice?.capital_price ?? 0)) *
	// 									100,
	// 								{ precision: 3 },
	// 							).value
	// 						}
	// 						%
	// 					</p>
	// 				</div>
	// 				<div className="col-span-2 flex flex-col justify-center	gap-1">
	// 					<h3 className="text-sm font-bold">Markup price</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{Intl.NumberFormat('en-US', {
	// 							style: 'currency',
	// 							currency: 'PHP',
	// 						}).format(selectedProductPrice?.markup_price ?? 0)}
	// 					</p>
	// 				</div>
	// 				<div className="col-span-2 flex flex-col justify-center	gap-1">
	// 					<h3 className="text-sm font-bold">Cost</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{Intl.NumberFormat('en-US', {
	// 							style: 'currency',
	// 							currency: 'PHP',
	// 						}).format(selectedProductPrice?.cost ?? 0)}
	// 					</p>
	// 				</div>
	// 				<div className="relative col-span-2 flex flex-col justify-center gap-1">
	// 					<h3 className="text-sm font-bold">Sale discount</h3>
	// 					<p className="text-sm">
	// 						{selectedProductPrice?.on_sale === 1
	// 							? Intl.NumberFormat('en-US', {
	// 									style: 'currency',
	// 									currency: 'PHP',
	// 								}).format(selectedProductPrice?.sale_discount)
	// 							: '—'}
	// 					</p>
	// 					<div className="absolute bottom-0 right-0 flex flex-none flex-row items-center justify-end gap-1 pb-[0.1rem] pr-1">
	// 						{selectedProductPrice?.on_sale === 1 ? (
	// 							<Check
	// 								size={14}
	// 								strokeWidth={3.5}
	// 								className="text-green-600"
	// 							/>
	// 						) : (
	// 							<X
	// 								size={14}
	// 								strokeWidth={3.5}
	// 								className="text-gray-600"
	// 							/>
	// 						)}
	// 						<div className="text-xs font-semibold leading-4 text-gray-900">
	// 							On Sale
	// 						</div>
	// 					</div>
	// 				</div>
	// 				<div className="relative col-span-2 flex flex-col justify-center gap-1">
	// 					<h3 className="text-sm font-bold">Price</h3>
	// 					<p className="text-sm">
	// 						{Intl.NumberFormat('en-US', {
	// 							style: 'currency',
	// 							currency: 'PHP',
	// 						}).format(selectedProductPrice?.price ?? 0)}
	// 					</p>
	// 				</div>
	// 			</div>
	// 			<hr className="my-2 h-px w-full border-0 bg-gray-200" />
	// 			<div className="grid w-full grid-flow-row grid-cols-12 gap-x-6 gap-y-4">
	// 				<div className="col-span-4 flex flex-col justify-center gap-1">
	// 					<h3 className="text-sm font-bold">Created by</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{selectedProductPrice?.created_by.firstname +
	// 							' ' +
	// 							selectedProductPrice?.created_by.lastname}
	// 					</p>
	// 				</div>
	// 				<div className="col-span-4 flex flex-col justify-center gap-1">
	// 					<h3 className="text-sm font-bold">Created at</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{selectedProductPrice?.created_at
	// 							? formatUTCDate(selectedProductPrice.created_at)
	// 							: 'No data'}
	// 					</p>
	// 				</div>
	// 				<div className="col-span-4 flex flex-col justify-center gap-1">
	// 					<h3 className="text-sm font-bold">Updated at</h3>
	// 					<p className="text-sm text-gray-800">
	// 						{selectedProductPrice?.updated_at
	// 							? formatUTCDate(selectedProductPrice.updated_at)
	// 							: 'No data'}
	// 					</p>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</>
	// );

	return (
		<>
			<div className="flex max-w-2xl flex-col gap-4 font-medium">
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-x-6 gap-y-4">
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Name</h3>
						<p className="text-sm text-gray-800">
							{selectedProductPrice.product.name}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Brand</h3>
						<p className="text-sm text-gray-800">
							{selectedProductPrice.product.brand || (
								<span className="opacity-60">No brand</span>
							)}
						</p>
					</div>
					<div className="col-span-6 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Serial number</h3>
						<p className="text-sm text-gray-800">
							{selectedProductPrice.product.serial_no}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Unit</h3>
						<p className="text-sm text-gray-800">
							{selectedProductPrice.inventory_product.unit}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Size</h3>
						<p className="text-sm text-gray-800">
							{selectedProductPrice.product.size}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Color</h3>
						<p className="text-sm text-gray-800">
							{selectedProductPrice.product.color}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Inventory</h3>
						<p className="text-sm text-gray-800">
							{selectedProductPrice.inventory_product.inventory.code}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-6 gap-x-6 gap-y-4">
					<div className="relative col-span-2 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Capital price</h3>
						<p className="text-sm text-gray-800">
							{Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'PHP',
							}).format(selectedProductPrice.capital_price)}
						</p>
					</div>
					<div className="col-span-2 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Markup percent</h3>
						<p className="text-sm text-gray-800">
							{
								currency(
									(selectedProductPrice.markup_price /
										selectedProductPrice.capital_price) *
										100,
									{ precision: 3 },
								).value
							}
							%
						</p>
					</div>
					<div className="col-span-2 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Markup price</h3>
						<p className="text-sm text-gray-800">
							{Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'PHP',
							}).format(selectedProductPrice.markup_price)}
						</p>
					</div>
					<div className="col-span-2 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Cost</h3>
						<p className="text-sm text-gray-800">
							{Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'PHP',
							}).format(selectedProductPrice.cost)}
						</p>
					</div>
					<div className="relative col-span-2 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Sale discount</h3>
						<p className="text-sm">
							{selectedProductPrice.on_sale === 1
								? Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'PHP',
									}).format(selectedProductPrice.sale_discount)
								: '—'}
						</p>
						<div className="absolute bottom-0 right-0 flex flex-none flex-row items-center justify-end gap-1 pb-[0.1rem] pr-1">
							{selectedProductPrice.on_sale === 1 ? (
								<Check
									size={14}
									strokeWidth={3.5}
									className="text-green-600"
								/>
							) : (
								<X
									size={14}
									strokeWidth={3.5}
									className="text-gray-600"
								/>
							)}
							<div className="text-xs font-semibold leading-4 text-gray-900">
								On Sale
							</div>
						</div>
					</div>
					<div className="relative col-span-2 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Price</h3>
						<p className="text-sm">
							{Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'PHP',
							}).format(selectedProductPrice.price)}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-12 gap-x-6 gap-y-4">
					{/* <div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Active status</h3>
						<span className="flex flex-row items-center gap-2">
							{selectedProductPrice.active_status === 'active' ? (
								<CheckCircle
									size={16}
									strokeWidth={2.5}
									className="text-green-600"
								/>
							) : (
								<CircleOff
									size={16}
									strokeWidth={2.5}
									className="text-gray-600"
								/>
							)}
							<p className="text-sm capitalize text-gray-800">
								{selectedProductPrice.active_status}
							</p>
						</span>
					</div> */}
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Created by</h3>
						<p className="text-sm text-gray-800">
							{selectedProductPrice.created_by.firstname +
								' ' +
								selectedProductPrice.created_by.lastname}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Created at</h3>
						<p className="text-sm text-gray-800">
							{formatUTCDate(selectedProductPrice.created_at)}
						</p>
					</div>
					{/* <div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Approval status</h3>
						<p className="text-sm capitalize">
							{selectedProductPrice.approval_status}
						</p>
					</div> */}
					{/* <div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Approved by</h3>
						<p className="text-sm text-gray-800">
							{selectedProductPrice.approved_by
								? selectedProductPrice.approved_by.firstname +
									' ' +
									selectedProductPrice.approved_by.firstname
								: 'N/A'}
						</p>
					</div> */}
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Updated at</h3>
						<p className="text-sm text-gray-800">
							{formatUTCDate(selectedProductPrice.updated_at)}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
