import { useDebounce } from '@uidotdev/usehooks';
import { useMemo, useRef, useState } from 'react';
import { usePos } from '../../context/__test__/PosContext';
import { useInvoicePos } from '../../context/__test__/InvoicePosContext';
import {
	Combobox,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from '@headlessui/react';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ProductPrices } from '@/features/product/__test__/types';

export const SearchItems = () => {
	// Contexts
	const { sellableItems, fetchingProducts } = usePos();
	const {
		currentInvoiceItemsQueue,
		setCurrentInvoiceItemsQueue,
		invoiceItemsDatabase,
		setInvoiceItemsDatabase,
		currentInvoicePos,
	} = useInvoicePos();

	// State for storing search value
	const [search, setSearch] = useState('');
	const debouncedSearchTerm = useDebounce(search, 450);

	// Filtering sellable items
	const filteredSellableItems = useMemo(() => {
		return sellableItems?.filter(
			stocks =>
				stocks.inventory_product.approved_stocks >
				(stocks.inventory_product.sold_count ?? 0),
		);
	}, [sellableItems]);

	// Filtering items when searching
	const searchedItems = useMemo(() => {
		if (debouncedSearchTerm !== '') {
			return filteredSellableItems?.filter(item =>
				`${item.product.name} ${item.product.brand} ${item.product.serial_no}`
					.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase()),
			);
		}
		return [];
	}, [filteredSellableItems, debouncedSearchTerm]);

	// Virtualizing the list
	const containerRef = useRef<HTMLDivElement>(null);
	const listVirtualizer = useVirtualizer({
		count: searchedItems?.length ?? 0,
		getScrollElement: () => containerRef.current,
		estimateSize: () => 56, // Estimate the item height
		overscan: 24, // Number of items to render outside the viewport for smoother scrolling
	});

	return (
		<Combobox
			onClose={() => setSearch('')}
			onChange={(value: { item: ProductPrices } | null) => {
				if (value) {
					const item = value.item;
					const selectedInvoiceItemIndex =
						currentInvoiceItemsQueue.findIndex(
							invoiceItem =>
								invoiceItem.inventory_product.product.id ===
								item.inventory_product.product.id,
						);

					if (selectedInvoiceItemIndex !== -1) {
						invoiceItemsDatabase[selectedInvoiceItemIndex].quantity += 1;
						setSearch('');
					}
					//If it doesn't exist, add it to the array
					if (selectedInvoiceItemIndex === -1) {
						//@ts-expect-error 'item' is of type ProductPrices
						setCurrentInvoiceItemsQueue([
							...currentInvoiceItemsQueue,
							item,
						]);
						setInvoiceItemsDatabase([
							...invoiceItemsDatabase,
							{
								//@ts-expect-error outdated type
								product_id: item.product.id,
								product_price_id:
									//@ts-expect-error outdated type
									item.inventory_product.product_price.id,
								product_price:
									//@ts-expect-error outdated type
									item.inventory_product.product_price.price,
								quantity: 1,
								//@ts-expect-error outdated type
								unit: item.unit,
								// inventory_product:
								//    item.inventory_product,
								item_discount: 0,
								price: item.price,
								created_by: item.created_by,
								active_status: item.active_status,
								created_at: item.created_at,
								updated_at: item.updated_at,
								total_price: item.price, // TODO, total price should be quantity * product_price
								source_inventory: item.warehouse.id,
							},
						]);
					}
				}
			}}
		>
			<ComboboxInput
				aria-label="product-search-box"
				className="w-full rounded border p-3 text-sm font-medium focus:shadow-lg disabled:cursor-not-allowed disabled:bg-white"
				onChange={e => setSearch(e.target.value)}
				placeholder={
					fetchingProducts
						? 'Fetching products...'
						: (filteredSellableItems?.length ?? 0) > 0
							? 'Search product name...'
							: 'No products available'
				}
				disabled={
					fetchingProducts ||
					filteredSellableItems?.length === 0 ||
					currentInvoicePos.payment_method === 'balance_payment'
				}
			/>
			<ComboboxOptions
				ref={containerRef}
				anchor="bottom"
				className="w-[var(--input-width)] cursor-pointer overflow-auto rounded-md border bg-white p-1 shadow-lg [--anchor-gap:0.5rem] [--anchor-max-height:60vh] empty:invisible"
			>
				{debouncedSearchTerm !== '' && searchedItems?.length === 0 && (
					<ComboboxOption
						value=""
						className="flex h-14 flex-col justify-center px-1 text-sm font-medium"
						disabled
					>
						No products found.
					</ComboboxOption>
				)}
				<div
					style={{
						height: `${listVirtualizer.getTotalSize()}px`, // Total height of all virtualized items
						position: 'relative',
					}}
				>
					{listVirtualizer.getVirtualItems().map(virtualRow => {
						const item = searchedItems?.[virtualRow.index];
						if (!item) return null;

						const availableStocks =
							item.inventory_product.approved_stocks -
							(item.inventory_product.sold_count ?? 0);

						return (
							<ComboboxOption
								key={`${item.inventory_product.id}-${item.product.name}`}
								value={{ item: item as ProductPrices }}
								className="flex flex-row justify-between rounded-sm px-1 py-2 text-sm font-medium data-[focus]:bg-slate-100"
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									transform: `translateY(${virtualRow.start}px)`,
								}}
							>
								<div className="flex flex-col gap-1">
									<div className="space-x-2">
										<span className="font-bold">
											{item.product.name}
										</span>
										<span className="">{item.product.size}</span>
									</div>
									<span className="text-xs text-slate-700/80">
										{item.product.brand} - {item.product.color}
									</span>
								</div>

								<div className="flex flex-col items-end gap-1">
									<span>{formatCurrency(item.price)}</span>
									<span className="text-xs text-slate-700/80">
										{`${availableStocks} ${availableStocks > 1 ? 'items' : 'item'}`}
									</span>
								</div>
							</ComboboxOption>
						);
					})}
				</div>
			</ComboboxOptions>
		</Combobox>
	);
};
