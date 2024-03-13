import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseModalProps } from '@/utils/Modal';
import { useProductQuery } from '@/features/product/__test__/hooks';
import { useSupplierQuery } from '@/features/supplier/__test__/hooks';
import { useInventoryProdsMutation } from '../../hooks/useInventoryProdsMutation';
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
import { Button } from '@/components/ui/button';
import { Button as LegacyButton } from '@/components';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AddInventoryProductFormProps {
	onClose: UseModalProps['closeModal'];
	inventoryId: number;
}

export const AddInventoryProductForm = ({
	onClose,
	inventoryId,
}: AddInventoryProductFormProps) => {
	const {
		value: FormValue,
		handleChange,
		handleSubmit,
	} = useInventoryProdsMutation();

	// Query and state handlers for PRODUCTS
	const { data: products, isLoading: productsLoading } = useProductQuery();
	const [productsListOpen, setProductsListOpen] = useState(false);
	// Query and state handlers for SUPPLIERS
	const { suppliers, isFetching: suppliersLoading } = useSupplierQuery();
	const [suppliersListOpen, setSuppliersListOpen] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => console.log('form:', FormValue), [FormValue]);

	// Initialize form, append inventory_id to form
	useEffect(() => {
		handleChange('inventory_id', inventoryId);
	}, []);

	return (
		<>
			<form
				onSubmit={async e => {
					e.preventDefault();
					if (FormValue.product_id === undefined) {
						setError('Please select a product first.');
					} else if (FormValue.supplier_id === undefined) {
						setError('Please select a supplier first.');
					} else {
						setIsSubmitting(!isSubmitting);
						const response = await handleSubmit({
							action: 'add',
							data: FormValue,
						});
						response?.status === 201 // Status 201 means resource successfully created
							? (setIsSubmitting(!isSubmitting), onClose())
							: (setIsSubmitting(!isSubmitting),
								setError('Failed to add inventory'));
					}
				}}
			>
				<div className="flex w-[540px] flex-col gap-3">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
						<div className="col-span-6 flex flex-col justify-center gap-1">
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
																{selectedProduct?.name}
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
								<PopoverContent className="p-0 text-sm font-medium text-slate-700">
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
														onSelect={() => {
															handleChange(
																'product_id',
																product.id,
															);
															setProductsListOpen(false);
														}}
													>
														<span>{product.name}</span>
														<span className="text-xs font-semibold text-slate-700/50">
															{product.serial_no}
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
								<PopoverContent className="p-0 text-sm font-medium text-slate-700">
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
					</div>
					<hr className="my-2 h-px w-full border-0 bg-gray-200" />
					<div className="grid w-full grid-flow-row grid-cols-6 gap-3">
						<div className="relative col-span-3 flex flex-col justify-center gap-1">
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
								placeholder={'e.g. 2000.00'}
								onBlur={e => {
									e.target.value = Number(e.target.value).toFixed(2);
								}}
								onChange={e => {
									const formattedValue = Number(
										e.target.value,
									).toFixed(2);
									handleChange(
										'capital_price',
										Number(formattedValue),
									);
								}}
							/>
							<span className="absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500">
								₱
							</span>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
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
								placeholder={'e.g. pcs...'}
								onChange={e => handleChange('unit', e.target.value)}
							/>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<Label
								htmlFor="bundles_count"
								className="text-sm font-bold text-gray-600"
							>
								Bundles count
							</Label>
							<Input
								id="bundles_count"
								name="bundles_count"
								type="number"
								min={0}
								max={9999999}
								step={1}
								placeholder="0"
								required
								onBlur={e => {
									e.target.value = Number(e.target.value).toFixed(0);
								}}
								onChange={e =>
									handleChange('bundles_count', e.target.value)
								}
							/>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<Label
								htmlFor="bundles_unit"
								className="text-sm font-bold text-gray-600"
							>
								Bundles unit
							</Label>
							<Input
								id="bundles_unit"
								name="bundles_unit"
								type="text"
								maxLength={40}
								required
								placeholder={'e.g. boxes...'}
								onChange={e =>
									handleChange('bundles_unit', e.target.value)
								}
							/>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<Label
								htmlFor="quantity_per_bundle"
								className="text-sm font-bold text-gray-600"
							>
								Quantity per bundle
							</Label>
							<Input
								id="quantity_per_bundle"
								name="quantity_per_bundle"
								type="number"
								min={0}
								max={9999999}
								step={1}
								placeholder="0"
								required
								onBlur={e => {
									e.target.value = Number(e.target.value).toFixed(0);
								}}
								onChange={e =>
									handleChange('quantity_per_bundle', e.target.value)
								}
							/>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
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
								placeholder="0"
								required
								onBlur={e => {
									e.target.value = Number(e.target.value).toFixed(0);
								}}
								onChange={e =>
									handleChange('stocks_count', e.target.value)
								}
							/>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
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
								max={9999999}
								step={1}
								placeholder="0"
								required
								onBlur={e => {
									e.target.value = Number(e.target.value).toFixed(0);
								}}
								onChange={e =>
									handleChange('damage_count', e.target.value)
								}
							/>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
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
								placeholder="0"
								required
								onBlur={e => {
									e.target.value = Number(e.target.value).toFixed(0);
								}}
								onChange={e =>
									handleChange('total_count', e.target.value)
								}
							/>
						</div>
					</div>
					<div className="flex w-full justify-between whitespace-nowrap pt-6">
						<div className="ml-auto flex flex-row gap-4">
							<LegacyButton
								fill={'default'}
								type="reset"
								onClick={() => onClose()}
								className="flex-1 py-2 text-sm font-bold text-slate-700 hover:text-white"
							>
								Cancel
							</LegacyButton>
							<LegacyButton
								type="submit"
								fill={'green'}
								disabled={
									isSubmitting ||
									FormValue.product_id === undefined ||
									FormValue.supplier_id === undefined
								} // Disable button if submitting or no product/supplier selected
								className="max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
							>
								{!isSubmitting ? 'Submit item' : 'Submitting...'}
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
