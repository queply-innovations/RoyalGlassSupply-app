import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInventoryProdsMutation } from '@/features/inventory/hooks';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Button as LegacyButton } from '@/components';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InventoryProductDatabase } from '@/features/inventory/types';
import { Product } from '@/features/product/__test__/types';
import { Supplier } from '@/features/supplier/types';
import { InventoryProductsQueueProps } from './AddInventoryProductPos';
import { useAuth } from '@/context/AuthContext';
import { getTotalCount } from '@/features/inventory/helpers';
interface AddInventoryProductFormProps {
	setInventoryProductsQueue: React.Dispatch<
		React.SetStateAction<InventoryProductsQueueProps[]>
	>;
	inventoryId: number;
	products: Product[];
	productsLoading: boolean;
	suppliers: Supplier[];
	suppliersLoading: boolean;
	currentId: number;
	handleNavigation: () => void;
	selectedProduct?: InventoryProductsQueueProps;
}

export const AddInventoryProductForm = ({
	// onClose,
	setInventoryProductsQueue,
	inventoryId,
	products,
	productsLoading,
	suppliers,
	suppliersLoading,
	currentId,
	handleNavigation,
	selectedProduct,
}: AddInventoryProductFormProps) => {
	const { auth } = useAuth();
	const isAdmin = auth.role?.includes('admin');
	const { value: FormValue, handleChange } = useInventoryProdsMutation();

	// State handlers for dropdowns/popovers
	const [productsListOpen, setProductsListOpen] = useState(false);
	const [suppliersListOpen, setSuppliersListOpen] = useState(false);

	const [error, setError] = useState<string | null>(null);

	// Initialize form, append inventory_id to form
	useEffect(() => {
		handleChange('inventory_id', inventoryId);
		handleChange('unit', 'pcs'); // Default unit is pcs
		isAdmin && handleChange('status', 1); // automatically set status to approved if user is admin or super_admin

		// If selectedProduct is not undefined, populate the form with selectedProduct's data
		selectedProduct &&
			(handleChange('product_id', selectedProduct.data.product_id),
			handleChange('status', selectedProduct.data.status),
			handleChange('supplier_id', selectedProduct.data.supplier_id),
			handleChange('capital_price', selectedProduct.data.capital_price),
			handleChange('unit', selectedProduct.data.unit),
			handleChange('stocks_count', selectedProduct.data.stocks_count),
			handleChange('damage_count', selectedProduct.data.damage_count),
			handleChange('total_count', selectedProduct.data.total_count));

		// If authenticated user is not an admin, set the capital_price to 0.00
		!selectedProduct && !isAdmin && handleChange('capital_price', 0);
	}, []);

	// Calculate total count
	const [totalCount, setTotalCount] = useState<number | undefined>();
	useEffect(() => {
		const totalCountCalc = getTotalCount(
			FormValue.stocks_count || 0,
			FormValue.damage_count || 0,
		);

		setTotalCount(totalCountCalc);
		handleChange('total_count', totalCountCalc);
	}, [FormValue.damage_count, FormValue.stocks_count, totalCount]);

	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
					if (FormValue.product_id === undefined) {
						setError('Please select a product first.');
					} else if (FormValue.supplier_id === undefined) {
						setError('Please select a supplier first.');
					} else {
						selectedProduct
							? // If selectedProduct is not undefined, update the queue
								setInventoryProductsQueue(prev => [
									...prev.filter(
										item => item.id !== selectedProduct.id,
									),
									{
										id: selectedProduct.id,
										data: FormValue as InventoryProductDatabase,
									},
								])
							: setInventoryProductsQueue(prev => [
									...prev,
									{
										id: currentId + 1,
										data: FormValue as InventoryProductDatabase,
									},
								]);
						handleNavigation();
					}
				}}
			>
				<div className="flex w-full flex-col gap-3">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
						<div
							className={`${
								isAdmin ? 'col-span-12' : 'col-span-6'
							} flex flex-col justify-center gap-1`}
						>
							<Label
								htmlFor="product_id"
								className="text-sm font-bold text-gray-600"
							>
								Product
							</Label>
							<Popover
								open={productsListOpen}
								onOpenChange={setProductsListOpen}
							>
								<PopoverTrigger
									id="product_id"
									className="relative w-full"
									asChild
									autoFocus
								>
									<Button
										role="combobox"
										className="w-full justify-between text-sm font-bold text-slate-700"
										variant={'outline'}
									>
										{FormValue.product_id ? (
											<>
												{(() => {
													const selectedProduct = products.find(
														prod =>
															prod.id === FormValue.product_id,
													);
													return (
														<div className="flex w-full items-baseline gap-4 capitalize">
															<span className="max-w-full truncate">
																{selectedProduct?.name}{' '}
																{selectedProduct?.brand &&
																	`(${selectedProduct.brand})`}
															</span>
															<span className="font-baseline text-xs text-slate-700/50">
																{selectedProduct?.serial_no}
															</span>
														</div>
													);
												})()}
											</>
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
								<PopoverContent
									className={`${
										isAdmin ? 'max-w-[966px]' : 'max-w-[477px]'
									} w-[calc(100vw-170px)] p-0 text-sm font-medium text-slate-700`}
								>
									<Command>
										<CommandInput placeholder="Product name or serial number..." />
										{productsLoading && (
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
											<CommandGroup>
												{products.map((product, key) => (
													<CommandItem
														key={key}
														className="cursor-pointer justify-between rounded-sm"
														value={
															product.name +
															product.serial_no +
															product.brand
														}
														onSelect={() => {
															handleChange(
																'product_id',
																product.id,
															);
															setProductsListOpen(false);
														}}
													>
														<span className="max-w-[50%] truncate">
															{product.name}{' '}
															{product.brand &&
																`(${product.brand})`}
														</span>
														<span className="max-w-[49%] truncate text-xs font-semibold text-slate-700/50">
															{product.serial_no +
																' • ' +
																product.size +
																' • ' +
																product.color}
														</span>
													</CommandItem>
												))}
											</CommandGroup>
										</ScrollArea>
									</Command>
								</PopoverContent>
							</Popover>
						</div>
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="supplier_id"
								className="text-sm font-bold text-gray-600"
							>
								Supplier
							</Label>
							<Popover
								open={suppliersListOpen}
								onOpenChange={setSuppliersListOpen}
							>
								<PopoverTrigger
									id="supplier_id"
									className="relative w-full"
									asChild
								>
									<Button
										role="combobox"
										className="w-full justify-between text-sm font-bold text-slate-700"
										variant={'outline'}
									>
										{FormValue.supplier_id ? (
											<>
												{(() => {
													const selectedSupplier = suppliers.find(
														supplier =>
															supplier.id ===
															FormValue.supplier_id,
													);
													return (
														<div className="flex w-full items-baseline gap-4 capitalize">
															<span className="max-w-full truncate">
																{selectedSupplier?.name}
															</span>
															<span className="font-baseline text-xs text-slate-700/50">
																{selectedSupplier?.address}
															</span>
														</div>
													);
												})()}
											</>
										) : (
											<span>Select a supplier...</span>
										)}

										<ChevronsUpDown
											size={14}
											strokeWidth={2}
											className="h-4 w-4 opacity-70"
										/>
									</Button>
								</PopoverTrigger>
								<PopoverContent className="min-w-[477px] p-0 text-sm font-medium text-slate-700">
									<Command>
										<CommandInput placeholder="Supplier name or address..." />
										{suppliersLoading && (
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
											<CommandGroup>
												{suppliers.map((supplier, key) => (
													<CommandItem
														key={key}
														className="cursor-pointer justify-between rounded-sm"
														onSelect={() => {
															handleChange(
																'supplier_id',
																supplier.id,
															);
															setSuppliersListOpen(false);
														}}
													>
														<span>{supplier.name}</span>
														<span className="text-xs font-semibold text-slate-700/50">
															{supplier.address}
														</span>
													</CommandItem>
												))}
											</CommandGroup>
										</ScrollArea>
									</Command>
								</PopoverContent>
							</Popover>
						</div>
						{isAdmin && (
							<div className="col-span-6 flex flex-col justify-center gap-1">
								<Label
									htmlFor="status"
									className="text-sm font-bold text-gray-600"
								>
									Status
								</Label>
								<Select
									value={FormValue.status?.toString()}
									required
									onValueChange={value =>
										handleChange('status', Number(value))
									}
								>
									<SelectTrigger
										name="status"
										id="status"
										className="w-full px-4 text-sm font-bold text-slate-700"
									>
										<SelectValue placeholder="Select status..." />
									</SelectTrigger>
									<SelectContent className="text-sm font-medium">
										<SelectItem value="1">Approved</SelectItem>
										<SelectItem value="0">Pending</SelectItem>
									</SelectContent>
								</Select>
							</div>
						)}
					</div>
					<hr className="my-2 h-px w-full border-0 bg-gray-200" />
					<div className="grid w-full grid-flow-row grid-cols-12 gap-3">
						<div
							className={`relative flex flex-col justify-center gap-1 ${isAdmin ? 'col-span-6' : 'hidden'}`}
						>
							<Label
								htmlFor="capital_price"
								className="text-sm font-bold text-gray-600"
							>
								Capital price
							</Label>
							<Input
								id="capital_price"
								name="capital_price"
								type="number"
								min={0}
								step={0.01}
								required
								className="pl-8"
								placeholder={'0.00'}
								disabled={!isAdmin} // Disable input if user is not an admin
								value={FormValue.capital_price || ''}
								onBlur={e => {
									FormValue.capital_price !== undefined
										? (e.target.value = Number(
												e.target.value,
											).toFixed(2))
										: undefined;
								}}
								onChange={e => {
									handleChange(
										'capital_price',
										Number(Number(e.target.value).toFixed(2)),
									);
								}}
							/>
							<span className="absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500">
								₱
							</span>
						</div>
						<div
							className={`flex flex-col justify-center gap-1 ${isAdmin ? 'col-span-6' : 'col-span-3'}`}
						>
							<Label
								htmlFor="unit"
								className="text-sm font-bold text-gray-600"
							>
								Unit
							</Label>
							<Input
								id="unit"
								name="unit"
								type="text"
								maxLength={40}
								required
								value={FormValue.unit || ''}
								onChange={e => handleChange('unit', e.target.value)}
							/>
						</div>
						<div
							className={`flex flex-col justify-center gap-1 ${isAdmin ? 'col-span-4' : 'col-span-3'}`}
						>
							<Label
								htmlFor="stocks_count"
								className="text-sm font-bold text-gray-600"
							>
								Stocks count
							</Label>
							<Input
								id="stocks_count"
								name="stocks_count"
								type="number"
								min={0}
								max={9999999}
								step={1}
								value={FormValue.stocks_count?.toFixed(0)}
								required
								onChange={e => {
									handleChange(
										'stocks_count',
										Number(Number(e.target.value).toFixed(0)),
									);
								}}
							/>
						</div>
						<div
							className={`flex flex-col justify-center gap-1 ${isAdmin ? 'col-span-4' : 'col-span-3'}`}
						>
							<Label
								htmlFor="damage_count"
								className="text-sm font-bold text-gray-600"
							>
								Damage count
							</Label>
							<Input
								id="damage_count"
								name="damage_count"
								type="number"
								min={0}
								max={FormValue.stocks_count ?? 0}
								step={1}
								required
								value={FormValue.damage_count?.toFixed(0)}
								onChange={e =>
									handleChange(
										'damage_count',
										Number(Number(e.target.value).toFixed(0)),
									)
								}
							/>
						</div>
						<div
							className={`flex flex-col justify-center gap-1 ${isAdmin ? 'col-span-4' : 'col-span-3'}`}
						>
							<Label
								htmlFor="total_count"
								className="text-sm font-bold text-gray-600"
							>
								Total count
							</Label>
							<Input
								id="total_count"
								name="total_count"
								type="number"
								min={0}
								max={9999999}
								step={1}
								readOnly
								value={totalCount ?? '0'}
								className={`${totalCount && totalCount < 0 && 'text-red-600'}`}
							/>
						</div>
					</div>
					<div className="flex w-full justify-between whitespace-nowrap pt-6">
						<div className="ml-auto flex flex-row gap-4">
							<LegacyButton
								type="submit"
								fill={'green'}
								disabled={
									FormValue.product_id === undefined ||
									FormValue.supplier_id === undefined
								} // Disable button if no product/supplier selected
								className="max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
							>
								{!selectedProduct
									? 'Add item to queue'
									: 'Save changes'}
							</LegacyButton>
						</div>
					</div>
					{error && (
						<div className="flex w-full flex-row justify-center gap-4">
							<p className="text-sm font-bold text-red-600">{error}</p>
						</div>
					)}
				</div>
			</form>
		</>
	);
};
