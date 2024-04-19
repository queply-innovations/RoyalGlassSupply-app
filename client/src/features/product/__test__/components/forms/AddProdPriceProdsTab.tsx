import { useEffect, useState } from 'react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Button as LegacyButton } from '@/components';
import { Warehouse } from '@/features/warehouse/__test__/types';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types';
import { useProductPrices } from '../../context/ProductPricesContext';

interface AddProdPriceProdTabProps {
	warehouses: Warehouse[] | undefined;
	selectedWarehouse: Warehouse | undefined;
	setSelectedWarehouse: React.Dispatch<
		React.SetStateAction<Warehouse | undefined>
	>;

	setOpenedTab: React.Dispatch<React.SetStateAction<string>>;
	onClose: () => void;
}

export const AddProdPriceProdsTab = ({
	warehouses,
	selectedWarehouse,
	setSelectedWarehouse,
	setOpenedTab,
	onClose,
}: AddProdPriceProdTabProps) => {
	const {
		data: products,
		selectedProduct,
		setSelectedProduct,
		isLoading: isProductsLoading,
	} = useProducts();
	const { data: productPrices } = useProductPrices();
	const [productsListOpen, setProductsListOpen] = useState(false);
	const [filteredProducts, setFilteredProducts] = useState<
		Product[] | undefined
	>();

	// Filter out products that already have a price listing in the selected warehouse
	useEffect(() => {
		if (selectedWarehouse) {
			const filteredProductPrices = productPrices.filter(
				pricing => pricing.warehouse.id === selectedWarehouse?.id,
			);
			const idsToRemove = [
				...new Set(filteredProductPrices.map(item => item.product.id)),
			];
			setFilteredProducts(
				products?.filter(product => !idsToRemove.includes(product.id)),
			);
		}
	}, [selectedWarehouse]);

	return (
		<div className="grid w-full grid-cols-12 gap-4">
			<div className="col-span-4 flex flex-col justify-center gap-1">
				<Label
					htmlFor="warehouse"
					className="text-sm font-bold text-gray-600"
				>
					Warehouse
				</Label>
				<Select
					required
					value={selectedWarehouse?.id.toString()}
					onValueChange={value => {
						setSelectedWarehouse(
							warehouses?.find(w => w.id === Number(value)),
						);
						setSelectedProduct(undefined);
					}}
				>
					<SelectTrigger
						id="warehouse"
						name="warehouse"
						className="flex flex-row items-center gap-3 truncate bg-white text-sm font-bold text-slate-600"
					>
						<SelectValue placeholder={'Choose warehouse...'} />
					</SelectTrigger>
					<SelectContent className="bg-white font-medium">
						{warehouses ? (
							warehouses.map(warehouse => (
								<SelectItem
									key={warehouse.code}
									value={warehouse.id.toString()}
									className="text-sm font-medium text-slate-700"
								>
									{warehouse.name}
								</SelectItem>
							))
						) : (
							<div className="flex h-12 w-full items-center justify-center">
								<Loader2
									size={22}
									strokeWidth={2.5}
									className="animate-spin text-slate-700/50"
								/>
							</div>
						)}
					</SelectContent>
				</Select>
			</div>
			<div className="col-span-8 flex flex-col justify-center gap-1">
				<Label
					htmlFor="product"
					className="text-sm font-bold text-gray-600"
				>
					Product
				</Label>
				<Popover open={productsListOpen} onOpenChange={setProductsListOpen}>
					<PopoverTrigger
						id="product"
						name="product"
						className="relative w-full"
						disabled={!selectedWarehouse}
						asChild
					>
						<Button
							role="combobox"
							className="justify-between truncate bg-white text-sm font-bold text-slate-600"
							variant={'outline'}
						>
							{selectedProduct ? (
								<div className="font-bold text-slate-600">
									{selectedProduct.name}
								</div>
							) : (
								<span>Select a product...</span>
							)}

							<ChevronsUpDown
								size={14}
								strokeWidth={2}
								className="h-4 w-4 opacity-70"
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[554px] p-0 text-sm font-medium text-slate-700">
						<Command
							defaultValue={
								selectedProduct
									? selectedProduct.id +
										selectedProduct.name +
										selectedProduct.serial_no
									: undefined
							}
							// value={
							// 	selectedProduct
							// 		? selectedProduct.id +
							// 			selectedProduct.name +
							// 			selectedProduct.serial_no
							// 		: undefined
							// }
						>
							<CommandInput placeholder="Product name..." />
							{isProductsLoading && (
								<div className="flex h-16 w-full items-center justify-center">
									<Loader2
										size={22}
										strokeWidth={2.5}
										className="animate-spin text-slate-700/50"
									/>
								</div>
							)}
							<CommandEmpty>No match found</CommandEmpty>
							<ScrollArea className="max-h-[200px] overflow-y-scroll">
								{filteredProducts?.length === 0 && (
									<CommandGroup>
										<div className="flex h-16 w-full items-center justify-center pt-2">
											No products.&nbsp;
											<Link to={`/products`} className="underline">
												Add a product
											</Link>
										</div>
									</CommandGroup>
								)}
								<CommandGroup>
									{filteredProducts &&
										filteredProducts.map((product, key) => (
											<CommandItem
												key={key}
												className="cursor-pointer justify-between rounded-sm border-b"
												value={
													product.id +
													'_' +
													product.name +
													'_' +
													product.serial_no
												}
												onSelect={() => {
													setSelectedProduct(product);
													setProductsListOpen(false);
												}}
											>
												<div className="flex w-full flex-row justify-between gap-4">
													<div className="flex max-w-[50%] flex-col">
														<span className="max-w-full truncate font-semibold">
															{product.name}
														</span>
														<span className="max-w-full truncate text-xs font-medium">
															{product.brand}
															{product.brand &&
																product.size &&
																' • '}
															{product.size}
															{product.size &&
																product.color &&
																' • '}
															{product.color}
														</span>
													</div>
													<div className="flex max-w-[50%] flex-col text-right">
														<span className="max-w-full truncate">
															{product.serial_no}
														</span>
													</div>
												</div>
											</CommandItem>
										))}
								</CommandGroup>
							</ScrollArea>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			{selectedProduct && (
				<>
					<div className="col-span-12 grid grid-flow-row grid-cols-12 gap-4 text-sm text-slate-700">
						<div className="col-span-4 flex flex-col gap-1">
							<h3 className="font-bold">Serial Number</h3>
							<p className="font-medium">{selectedProduct.serial_no}</p>
						</div>
						<div className="col-span-3 flex flex-col gap-1">
							<h3 className="font-bold">Brand</h3>
							<p className="font-medium">
								{selectedProduct?.brand || (
									<span className="opacity-60">No brand</span>
								)}
							</p>
						</div>
						<div className="col-span-2 flex flex-col gap-1">
							<h3 className="font-bold">Size</h3>
							<p className="font-medium">{selectedProduct.size}</p>
						</div>
						<div className="col-span-2 flex flex-col gap-1">
							<h3 className="font-bold">Color</h3>
							<p className="font-medium">{selectedProduct.color}</p>
						</div>
						<div className="col-span-12 flex flex-col gap-1">
							<h3 className="font-bold">Notes</h3>
							<p className="font-medium">
								{selectedProduct.notes || (
									<span className="opacity-70">No notes provided</span>
								)}
							</p>
						</div>
					</div>
				</>
			)}
			<hr className="col-span-12 border-t border-slate-200" />
			<p className="col-span-12 text-sm font-medium text-slate-700">
				You can only add a product price/listing to a warehouse once. If the
				product is not in the list, it is likely that it already has a
				listing for that warehouse.
			</p>
			<div className="col-span-12 flex w-full justify-between whitespace-nowrap pt-4">
				<div className="ml-auto flex flex-row gap-4">
					<LegacyButton
						fill={'default'}
						onClick={() => {
							onClose();
							setSelectedProduct(undefined);
						}}
						className="flex-1 py-2 text-sm font-bold text-slate-700 hover:text-white"
					>
						Cancel
					</LegacyButton>
					<LegacyButton
						fill={'green'}
						disabled={!selectedProduct}
						onClick={() => setOpenedTab('listings')}
						className={`flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50`}
					>
						Proceed
					</LegacyButton>
				</div>
			</div>
		</div>
	);
};
