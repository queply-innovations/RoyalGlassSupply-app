import { useState } from 'react';
import {
	Command,
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
import { Inventory, InventoryProduct } from '@/features/inventory/types';
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

interface AddProdPriceProdTabProps {
	warehouses: Warehouse[] | undefined;
	selectedWarehouse: Warehouse | undefined;
	setSelectedWarehouse: React.Dispatch<
		React.SetStateAction<Warehouse | undefined>
	>;

	inventories: Inventory[] | undefined;
	selectedInventory: Inventory | undefined;
	setSelectedInventory: React.Dispatch<
		React.SetStateAction<Inventory | undefined>
	>;

	inventoryProducts: InventoryProduct[] | undefined;
	selectedInventoryProduct: InventoryProduct | undefined;
	setSelectedInventoryProduct: React.Dispatch<
		React.SetStateAction<InventoryProduct | undefined>
	>;

	setOpenedTab: React.Dispatch<React.SetStateAction<string>>;
	onClose: () => void;
}

export const AddProdPriceProdsTab = ({
	warehouses,
	selectedWarehouse,
	setSelectedWarehouse,
	inventories,
	selectedInventory,
	setSelectedInventory,
	inventoryProducts,
	selectedInventoryProduct,
	setSelectedInventoryProduct,
	setOpenedTab,
	onClose,
}: AddProdPriceProdTabProps) => {
	const [inventoriesListOpen, setInventoriesListOpen] = useState(false);
	const [inventoryProductsListOpen, setInventoryProductsListOpen] =
		useState(false);
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
						setSelectedInventory(undefined);
						setSelectedInventoryProduct(undefined);
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
									<span className="truncate text-xs text-slate-700/60">
										{' • ' + warehouse.code}
									</span>
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
					htmlFor="inventory"
					className="text-sm font-bold text-gray-600"
				>
					Inventory
				</Label>
				<Popover
					open={inventoriesListOpen}
					onOpenChange={setInventoriesListOpen}
				>
					<PopoverTrigger
						id="inventory"
						name="inventory"
						className="relative w-full"
						disabled={!selectedWarehouse}
						asChild
					>
						<Button
							role="combobox"
							className="justify-between truncate bg-white text-sm font-bold text-slate-600"
							variant={'outline'}
						>
							{selectedInventory ? (
								<div className="font-bold text-slate-600">
									{selectedInventory.code}
								</div>
							) : (
								<span>Select an inventory...</span>
							)}

							<ChevronsUpDown
								size={14}
								strokeWidth={2}
								className="h-4 w-4 opacity-70"
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[442px] p-0 text-sm font-medium text-slate-700">
						<Command defaultValue={selectedInventory?.code || ''}>
							<CommandInput placeholder="Inventory code..." />
							{!inventories && (
								<div className="flex h-16 w-full items-center justify-center">
									<Loader2
										size={22}
										strokeWidth={2.5}
										className="animate-spin text-slate-700/50"
									/>
								</div>
							)}
							{/* <CommandEmpty>No match found</CommandEmpty> */}
							<ScrollArea className="max-h-[200px] overflow-y-scroll">
								{inventories?.length === 0 && (
									<div className="flex h-16 w-full items-center justify-center pt-2">
										No inventories.&nbsp;
										<Link to={'/inventory'} className="underline">
											Add inventory
										</Link>
									</div>
								)}
								<CommandGroup>
									{inventories &&
										inventories.map(inventory => (
											<CommandItem
												key={inventory.id}
												className="cursor-pointer justify-between rounded-sm"
												value={inventory.code}
												onSelect={() => {
													setSelectedInventory(inventory);
													setSelectedInventoryProduct(undefined);
													setInventoriesListOpen(false);
												}}
											>
												<span>{inventory.code}</span>
												<span className="text-xs font-semibold text-slate-700/50">
													{inventory.type +
														' • ' +
														inventory.date_received}
												</span>
											</CommandItem>
										))}
								</CommandGroup>
							</ScrollArea>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
			<div className="col-span-12 flex flex-col justify-center gap-1">
				<Label
					htmlFor="inventory-product"
					className="text-sm font-bold text-gray-600"
				>
					Inventory product
				</Label>
				<Popover
					open={inventoryProductsListOpen}
					onOpenChange={setInventoryProductsListOpen}
				>
					<PopoverTrigger
						id="inventory-product"
						name="inventory-product"
						className="relative w-full"
						disabled={!selectedInventory}
						asChild
					>
						<Button
							role="combobox"
							className="justify-between truncate bg-white text-sm font-bold text-slate-600"
							variant={'outline'}
						>
							{selectedInventoryProduct ? (
								<div className="font-bold text-slate-600">
									{selectedInventoryProduct.product.name}
								</div>
							) : (
								<span>Select an inventory product...</span>
							)}

							<ChevronsUpDown
								size={14}
								strokeWidth={2}
								className="h-4 w-4 opacity-70"
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[672px] p-0 text-sm font-medium text-slate-700">
						<Command
							defaultValue={
								selectedInventoryProduct
									? selectedInventoryProduct.id +
										selectedInventoryProduct.product.name
									: ''
							}
						>
							<CommandInput placeholder="Product name..." />
							{!inventoryProducts && (
								<div className="flex h-16 w-full items-center justify-center">
									<Loader2
										size={22}
										strokeWidth={2.5}
										className="animate-spin text-slate-700/50"
									/>
								</div>
							)}
							{/* <CommandEmpty>No match found</CommandEmpty> */}
							<ScrollArea className="max-h-[200px] overflow-y-scroll">
								{inventoryProducts?.length === 0 && (
									<div className="flex h-16 w-full items-center justify-center pt-2">
										No inventory products.&nbsp;
										<Link
											to={`/inventory/items/${selectedInventory?.id}`}
											className="underline"
										>
											Add inventory product
										</Link>
									</div>
								)}
								<CommandGroup>
									{inventoryProducts &&
										inventoryProducts.map(inventoryProduct => {
											// Filter out products with no remaining stocks
											if (
												inventoryProduct.remaining_stocks_count ??
												0 > 0
											)
												return (
													<CommandItem
														key={inventoryProduct.id}
														className="cursor-pointer justify-between rounded-sm"
														value={
															inventoryProduct.id +
															inventoryProduct.product.name
														}
														onSelect={() => {
															setSelectedInventoryProduct(
																inventoryProduct,
															);
															setInventoryProductsListOpen(
																false,
															);
														}}
													>
														<span>
															{inventoryProduct.product.name}
														</span>
														<span className="text-xs font-semibold text-slate-700/50">
															{inventoryProduct.supplier_id
																.name +
																' • ' +
																inventoryProduct.total_count +
																' remaining' +
																' • ' +
																Intl.NumberFormat('en-US', {
																	currency: 'PHP',
																	style: 'currency',
																}).format(
																	inventoryProduct.capital_price,
																)}
														</span>
													</CommandItem>
												);
										})}
								</CommandGroup>
							</ScrollArea>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
			{selectedInventoryProduct && (
				<div className="col-span-12 grid grid-flow-row grid-cols-12 gap-4 text-sm text-slate-700">
					<div className="col-span-6 flex flex-col gap-1">
						<h3 className="font-bold">Supplier</h3>
						<p className="font-medium">
							{selectedInventoryProduct.supplier_id.name}
						</p>
					</div>
					<div className="col-span-3 flex flex-col gap-1">
						<h3 className="font-bold">Size</h3>
						<p className="font-medium">
							{selectedInventoryProduct.product.size}
						</p>
					</div>
					<div className="col-span-3 flex flex-col gap-1">
						<h3 className="font-bold">Color</h3>
						<p className="font-medium">
							{selectedInventoryProduct.product.color}
						</p>
					</div>
					<div className="col-span-3 flex flex-col gap-1">
						<h3 className="font-bold">Capital price</h3>
						<p className="font-medium">
							{Intl.NumberFormat('en-US', {
								currency: 'PHP',
								style: 'currency',
							}).format(selectedInventoryProduct.capital_price)}
						</p>
					</div>
					<div className="col-span-3 flex flex-col gap-1">
						<h3 className="font-bold">Unit</h3>
						<p className="font-medium">{selectedInventoryProduct.unit}</p>
					</div>
					<div className="col-span-3 flex flex-col gap-1">
						<h3 className="font-bold">Bundles unit</h3>
						<p className="font-medium">
							{selectedInventoryProduct.bundles_unit}
						</p>
					</div>
					<div className="col-span-3 flex flex-col gap-1">
						<h3 className="font-bold">Remaining stocks</h3>
						<p className="font-medium">
							{selectedInventoryProduct.remaining_stocks_count}
						</p>
					</div>
				</div>
			)}
			<div className="col-span-12 flex w-full justify-between whitespace-nowrap pt-4">
				<div className="ml-auto flex flex-row gap-4">
					<LegacyButton
						fill={'default'}
						onClick={() => onClose()}
						className="flex-1 py-2 text-sm font-bold text-slate-700 hover:text-white"
					>
						Cancel
					</LegacyButton>
					<LegacyButton
						fill={'green'}
						disabled={!selectedInventoryProduct}
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
