import { UseModalProps } from '@/utils/Modal';
import { useProductPrices } from '../..';
import { useProductPricesMutation } from '../../hooks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { formatUTCDate } from '@/utils/timeUtils';
import { Button } from '@/components';

interface ProductPricesFormProps {
	onClose: UseModalProps['closeModal'];
}

// TODO: Test for bugs and errors.

export const ProductPricesForm = ({ onClose }: ProductPricesFormProps) => {
	// Mutation state and handlers
	const {
		value: FormValue,
		setValue: setFormValue,
		handleChange,
		handleSubmit,
	} = useProductPricesMutation();
	// Fetch selected product price/listing
	const { selectedProductPrice } = useProductPrices();
	// States for form submission and error message
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleReset = () => {
		// Omit the following properties from the selectedProductPrice object
		const {
			approved_by,
			created_by,
			created_at,
			warehouse,
			updated_at,
			product,
			id,
			...limitedListings
		} = selectedProductPrice;
		setFormValue(limitedListings);
	};

	return (
		<>
			<form
				onSubmit={async e => {
					setIsSubmitting(!isSubmitting);
					e.preventDefault();
					const response = await handleSubmit({
						action: 'update',
						id: selectedProductPrice.id,
						data: FormValue,
					});
					response?.status === 200
						? (setIsSubmitting(!isSubmitting), onClose())
						: (setIsSubmitting(!isSubmitting),
							setError('Failed to update product listing'));
				}}
			>
				<div className="flex max-w-2xl flex-col gap-3">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Name</h3>
							<p className="text-sm">
								{selectedProductPrice.product.name}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Product ID
							</h3>
							<p className="text-sm">
								{selectedProductPrice.product.id}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Listing ID
							</h3>
							<p className="text-sm">{selectedProductPrice.id}</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Size</h3>
							<p className="text-sm">
								{selectedProductPrice.product.size}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Color</h3>
							<p className="text-sm">
								{selectedProductPrice.product.color}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center	gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Warehouse Code
							</h3>
							<p className="text-sm">
								{selectedProductPrice.warehouse.code}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center	gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Warehouse
							</h3>
							<p className="text-sm">
								{selectedProductPrice.warehouse.name}
							</p>
						</div>
					</div>
					<hr className="my-2 h-px w-full border-0 bg-gray-200" />
					<div className="grid w-full grid-flow-row grid-cols-4 gap-3">
						<div className="col-span-1 flex flex-col justify-center gap-1">
							<Label
								htmlFor="type"
								className="text-sm font-bold text-gray-600"
							>
								Type
							</Label>
							<Select
								onValueChange={value => handleChange('type', value)}
								defaultValue={
									FormValue.type
										? FormValue.type
										: selectedProductPrice.type
											? selectedProductPrice.type
											: 'retail'
								}
								required
							>
								<SelectTrigger
									name="type"
									className="flex flex-row items-center gap-3 bg-white text-sm capitalize"
								>
									<SelectValue
										placeholder={
											FormValue.type ?? selectedProductPrice.type
										}
									/>
								</SelectTrigger>
								<SelectContent className="bg-white">
									<SelectItem
										key="retail"
										className="rounded-md"
										value="retail"
									>
										Retail
									</SelectItem>
									<SelectItem
										key="wholesale"
										className="rounded-md"
										value="wholesale"
									>
										Wholesale
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="col-span-1 flex flex-col justify-center gap-1">
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
								required
								defaultValue={selectedProductPrice.unit ?? ''}
								onChange={e => handleChange('unit', e.target.value)}
							/>
						</div>
						<div className="col-span-1 flex flex-col justify-center gap-1">
							<Label
								htmlFor="stocks_quantity"
								className="text-sm font-bold text-gray-600"
							>
								Stocks quantity
							</Label>
							<Input
								id="stocks_quantity"
								name="stocks_quantity"
								type="number"
								min={0}
								max={9999999}
								required
								defaultValue={selectedProductPrice.stocks_quantity ?? 0}
								onChange={e =>
									handleChange(
										'stocks_quantity',
										Number(e.target.value),
									)
								}
							/>
						</div>
						<div className="col-span-1 flex flex-col justify-center gap-1">
							<Label
								htmlFor="stocks_unit"
								className="text-sm font-bold text-gray-600"
							>
								Stocks unit
							</Label>
							<Input
								id="stocks_unit"
								name="stocks_unit"
								type="text"
								required
								defaultValue={selectedProductPrice.stocks_unit ?? ''}
								onChange={e =>
									handleChange('stocks_unit', e.target.value)
								}
							/>
						</div>
					</div>
					<hr className="my-2 h-px w-full border-0 bg-gray-200" />
					<div className="grid w-full grid-flow-row grid-cols-6 gap-3">
						<div className="relative col-span-2 flex flex-col justify-center gap-1">
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
								pattern="^\d+(,\d{3})*(\.\d{1,2})?$"
								required
								className="pl-8"
								defaultValue={
									selectedProductPrice.capital_price.toFixed(2) ?? 0
								}
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
						<div className="relative col-span-2 flex flex-col justify-center gap-1">
							<Label
								htmlFor="markup_price"
								className="text-sm font-bold text-gray-600"
							>
								Markup price
							</Label>
							<Input
								id="markup_price"
								name="markup_price"
								type="number"
								min={0}
								step={0.01}
								pattern="^\d+(,\d{3})*(\.\d{1,2})?$"
								required
								className="pl-8"
								defaultValue={
									selectedProductPrice.markup_price.toFixed(2) ?? 0
								}
								onChange={e => {
									const formattedValue = Number(
										e.target.value,
									).toFixed(2);
									handleChange('markup_price', Number(formattedValue));
								}}
							/>
							<span className="absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500">
								₱
							</span>
						</div>
						<div className="relative col-span-2 flex flex-col justify-center gap-1">
							<Label
								htmlFor="tax_amount"
								className="text-sm font-bold text-gray-600"
							>
								Tax amount
							</Label>
							<Input
								id="tax_amount"
								name="tax_amount"
								type="number"
								min={0}
								step={0.01}
								pattern="^\d+(,\d{3})*(\.\d{1,2})?$"
								required
								className="pl-8"
								defaultValue={
									selectedProductPrice.tax_amount.toFixed(2) ?? 0
								}
								onChange={e => {
									const formattedValue = Number(
										e.target.value,
									).toFixed(2);
									handleChange('tax_amount', Number(formattedValue));
								}}
							/>
							<span className="absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500">
								₱
							</span>
						</div>
						<div className="relative col-span-2 flex flex-col justify-center gap-1">
							<Label
								htmlFor="cost"
								className="text-sm font-bold text-gray-600"
							>
								Cost
							</Label>
							<Input
								id="cost"
								name="cost"
								type="number"
								min={0}
								step={0.01}
								pattern="^\d+(,\d{3})*(\.\d{1,2})?$"
								required
								className="pl-8"
								defaultValue={selectedProductPrice.cost.toFixed(2) ?? 0}
								onChange={e => {
									const formattedValue = Number(
										e.target.value,
									).toFixed(2);
									handleChange('cost', Number(formattedValue));
								}}
							/>
							<span className="absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500">
								₱
							</span>
						</div>
						<div className="relative col-span-2 flex flex-col justify-center gap-1">
							<Label
								htmlFor="sale_discount"
								className="text-sm font-bold text-gray-600"
							>
								Sale discount
							</Label>
							<Input
								id="sale_discount"
								name="sale_discount"
								type="number"
								min={0}
								step={0.01}
								pattern="^\d+(,\d{3})*(\.\d{1,2})?$"
								disabled={
									FormValue.on_sale === undefined
										? selectedProductPrice.on_sale === 0
										: FormValue.on_sale === 0
								}
								required
								className="pl-8"
								defaultValue={
									selectedProductPrice.sale_discount.toFixed(2) ?? 0
								}
								onChange={e => {
									const formattedValue = Number(
										e.target.value,
									).toFixed(2);
									handleChange(
										'sale_discount',
										Number(formattedValue),
									);
								}}
							/>
							<span className="absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500">
								₱
							</span>
							<div className="absolute bottom-0 right-0 flex flex-none flex-row items-center justify-start gap-2 pb-[0.65rem] pr-3">
								<Input
									name="on_sale"
									id="on_sale"
									type="checkbox"
									// defaultChecked={
									// 	selectedProductPrice.on_sale ? true : false
									// }
									checked={
										FormValue.on_sale === undefined
											? selectedProductPrice.on_sale === 1
											: FormValue.on_sale === 1
									}
									className="h-4 w-fit"
									onChange={e => {
										handleChange('on_sale', e.target.checked ? 1 : 0);
										!e.target.checked &&
											handleChange('sale_discount', 0);
									}}
								/>
								<Label
									htmlFor="on_sale"
									className="text-sm text-gray-700"
								>
									On Sale
								</Label>
							</div>
						</div>
						<div className="relative col-span-2 flex flex-col justify-center gap-1">
							<Label
								htmlFor="price"
								className="text-sm font-bold text-gray-600"
							>
								Price
							</Label>
							<Input
								id="price"
								name="price"
								type="number"
								min={0}
								step={0.01}
								pattern="^\d+(,\d{3})*(\.\d{1,2})?$"
								required
								className="pl-8"
								defaultValue={
									selectedProductPrice.price.toFixed(2) ?? 0
								}
								onChange={e => {
									const formattedValue = Number(
										e.target.value,
									).toFixed(2);
									handleChange('price', Number(formattedValue));
								}}
							/>
							<span className="absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500">
								₱
							</span>
						</div>
					</div>
					<hr className="my-2 h-px w-full border-0 bg-gray-200" />
					<div className="grid w-full grid-flow-row grid-cols-12 gap-3">
						<div className="col-span-4 flex flex-row items-center justify-start	gap-3">
							<Switch
								id="active_status"
								name="active_status"
								// defaultChecked={
								// 	selectedProductPrice.active_status === 'active'
								// }
								checked={
									FormValue.active_status
										? FormValue.active_status === 'active'
										: selectedProductPrice.active_status === 'active'
								}
								className="data-[state=checked]:bg-primary-green data-[state=unchecked]:bg-gray-300"
								onCheckedChange={checked => {
									handleChange(
										'active_status',
										checked ? 'active' : 'inactive',
									);
								}}
							/>
							<Label
								htmlFor="active_status"
								className="text-sm font-bold text-gray-600"
							>
								Active
							</Label>
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Created by
							</h3>
							<p className="text-sm">
								{selectedProductPrice.created_by.firstname +
									' ' +
									selectedProductPrice.created_by.lastname}
							</p>
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Created at
							</h3>
							<p className="text-sm">
								{formatUTCDate(selectedProductPrice.created_at)}
							</p>
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<Label
								htmlFor="approval_status"
								className="text-sm font-bold text-gray-600"
							>
								Approval status
							</Label>
							<Select
								onValueChange={value =>
									handleChange('approval_status', value)
								}
								defaultValue={
									selectedProductPrice.approval_status ?? 'pending'
								}
								required
							>
								<SelectTrigger
									name="type"
									className="flex flex-row items-center gap-3 bg-white text-sm capitalize"
								>
									<SelectValue
										placeholder={
											FormValue.approval_status ??
											selectedProductPrice.approval_status
										}
									/>
								</SelectTrigger>
								<SelectContent className="bg-white">
									<SelectItem
										key="pending"
										className="rounded-md"
										value="pending"
									>
										Pending
									</SelectItem>
									<SelectItem
										key="approved"
										className="rounded-md"
										value="approved"
									>
										Approved
									</SelectItem>
									<SelectItem
										key="rejected"
										className="rounded-md"
										value="rejected"
									>
										Rejected
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Approved by
							</h3>
							<p className="text-sm">
								{selectedProductPrice.approved_by
									? selectedProductPrice.approved_by.firstname +
										' ' +
										selectedProductPrice.approved_by.lastname
									: 'N/A'}
							</p>
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Updated at
							</h3>
							<p className="text-sm">
								{formatUTCDate(selectedProductPrice.updated_at)}
							</p>
						</div>
					</div>
					<div className="flex w-full flex-row justify-between pt-4">
						<div className="flex flex-row">
							<Button
								type="reset"
								fill={'default'}
								disabled={
									isSubmitting || Object.keys(FormValue).length === 0
								}
								className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
								onClick={handleReset}
							>
								Reset
							</Button>
						</div>
						<div className="flex flex-row gap-4 whitespace-nowrap">
							<Button
								type="reset"
								fill={'default'}
								className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								fill={'green'}
								disabled={
									isSubmitting || Object.keys(FormValue).length === 0
								} // Disable button if there are no changes or form is submitting
								className="flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
							>
								{!isSubmitting
									? 'Apply changes'
									: 'Applying changes...'}
							</Button>
						</div>
					</div>
					{error && (
						<div className="flex w-full flex-row justify-center gap-4">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}
				</div>
			</form>
		</>
	);
};
