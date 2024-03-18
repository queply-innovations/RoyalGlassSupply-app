import { UseModalProps } from '@/utils/Modal';
import { useInventoryProdsMutation } from '../../hooks/useInventoryProdsMutation';
import { useInventoryProds } from '../../context/InventoryProdsContext';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Button as LegacyButton } from '@/components';
import { Input } from '@/components/ui/input';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import { useSupplierQuery } from '@/features/supplier/__test__/hooks';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EditInventoryProductFormProps {
	onClose: UseModalProps['closeModal'];
}

export const EditInventoryProductForm = ({
	onClose,
}: EditInventoryProductFormProps) => {
	const { selectedInventoryProduct } = useInventoryProds();
	const {
		value: FormValue,
		handleChange,
		handleSubmit,
	} = useInventoryProdsMutation();

	const { suppliers, isFetching: suppliersLoading } = useSupplierQuery();
	const [suppliersListOpen, setSuppliersListOpen] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	return (
		<>
			<form
				action=""
				onSubmit={async e => {
					setIsSubmitting(!isSubmitting);
					e.preventDefault();
					const response = await handleSubmit({
						action: 'update',
						id: selectedInventoryProduct.id,
						data: FormValue,
					});
					response?.status === 200 // Status 200 means success
						? (setIsSubmitting(!isSubmitting), onClose())
						: (setIsSubmitting(!isSubmitting),
							setError('Failed to update item'));
				}}
			>
				<div className="flex max-w-2xl flex-col gap-3">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="product"
								className="text-sm font-bold text-gray-600"
							>
								Product
							</Label>
							<Input
								id="product"
								name="product"
								type="text"
								readOnly
								value={selectedInventoryProduct?.product.name}
							/>
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
											<span>
												{selectedInventoryProduct.supplier_id.name}
											</span>
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
										{suppliers === undefined && suppliersLoading && (
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
								defaultValue={selectedInventoryProduct?.capital_price.toFixed(
									2,
								)}
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
								defaultValue={selectedInventoryProduct?.unit}
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
								defaultValue={selectedInventoryProduct?.bundles_count}
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
								defaultValue={selectedInventoryProduct?.bundles_unit}
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
								defaultValue={
									selectedInventoryProduct?.quantity_per_bundle
								}
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
								defaultValue={selectedInventoryProduct?.stocks_count}
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
								defaultValue={selectedInventoryProduct?.damage_count}
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
								defaultValue={selectedInventoryProduct?.total_count}
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
									isSubmitting || Object.keys(FormValue).length === 0
								} // Disable button if no changes made
								className="max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
							>
								{!isSubmitting ? 'Apply changes' : 'Applying...'}
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