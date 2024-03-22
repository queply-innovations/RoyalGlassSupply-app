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
import { useEffect, useState } from 'react';
import { formatUTCDate } from '@/utils/timeUtils';
import { Button } from '@/components';
import { useAuth } from '@/context/AuthContext';
import currency from 'currency.js';

interface ProductPricesFormProps {
	onClose: UseModalProps['closeModal'];
}

export const ProductPricesForm = ({ onClose }: ProductPricesFormProps) => {
	const { auth } = useAuth();
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
		setMarkupPercentage(
			currency(
				(selectedProductPrice.markup_price /
					selectedProductPrice.capital_price || 1) * 100, // Prevent division by zero
				{ precision: 3 },
			).value,
		);
	};

	// MARKUP PERCENT & PRICE
	// markupPercentage = (markup_price / capital_price) * 100
	// markup_price = capital_price * (markupPercentage / 100)
	const [markupPercentage, setMarkupPercentage] = useState<number>(
		currency(
			(selectedProductPrice.markup_price /
				selectedProductPrice.capital_price || 1) * 100, // Prevent division by zero
			{ precision: 3 },
		).value,
	);
	useEffect(() => {
		const capitalPrice =
			FormValue.capital_price !== undefined
				? FormValue.capital_price
				: selectedProductPrice.capital_price || 0;
		const markup = currency(capitalPrice).multiply(markupPercentage / 100);

		handleChange('markup_price', markup.value);
	}, [FormValue.capital_price, markupPercentage]);

	// COST VALUE CALCULATION
	// cost = capital_price + markup_price + tax_amount
	useEffect(() => {
		const capitalPrice =
			FormValue.capital_price !== undefined
				? FormValue.capital_price
				: selectedProductPrice.capital_price;
		const markupPrice =
			FormValue.markup_price !== undefined
				? FormValue.markup_price
				: selectedProductPrice.markup_price;
		const taxAmount =
			FormValue.tax_amount !== undefined
				? FormValue.tax_amount
				: selectedProductPrice.tax_amount;

		handleChange(
			'cost',
			currency(capitalPrice).add(markupPrice).add(taxAmount).value,
		);
	}, [FormValue.capital_price, FormValue.markup_price, FormValue.tax_amount]);

	// PRICE CALCULATION
	// price = cost - sale_discount
	useEffect(() => {
		const cost =
			FormValue.cost !== undefined
				? FormValue.cost
				: selectedProductPrice.cost;
		const saleDiscount =
			FormValue.sale_discount !== undefined
				? FormValue.sale_discount
				: selectedProductPrice.sale_discount;

		handleChange('price', currency(cost).subtract(saleDiscount).value);
	}, [FormValue.cost, FormValue.sale_discount]);

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
					response?.status === 200 // 200 means request success
						? (setIsSubmitting(!isSubmitting), onClose())
						: (setIsSubmitting(!isSubmitting),
							setError('Failed to update product listing'));
				}}
			>
				<div className="flex max-w-2xl flex-col gap-3">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-x-3 gap-y-5">
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Name</h3>
							<p className="text-sm">
								{selectedProductPrice.product.name}
							</p>
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
								Warehouse
							</h3>
							<p className="text-sm">
								{selectedProductPrice.warehouse.code}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center	gap-1">
							<h3 className="text-sm font-bold text-gray-600">Type</h3>
							<p className="text-sm capitalize">
								{selectedProductPrice.type}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center	gap-1">
							<h3 className="text-sm font-bold text-gray-600">Unit</h3>
							<p className="text-sm">{selectedProductPrice.unit}</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center	gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Stocks quantity
							</h3>
							<p className="text-sm">
								{selectedProductPrice.stocks_quantity}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center	gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Stocks unit
							</h3>
							<p className="text-sm">
								{selectedProductPrice.stocks_unit}
							</p>
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
								inputMode="numeric"
								min={0}
								step={0.01}
								required
								placeholder={'0.00'}
								className="pl-7"
								value={
									FormValue.capital_price ||
									selectedProductPrice.capital_price.toFixed(2)
								}
								onChange={e => {
									handleChange(
										'capital_price',
										currency(e.target.value).value,
									);
								}}
								onBlur={e => {
									FormValue.capital_price !== undefined
										? (e.target.value = Number(
												FormValue.capital_price,
											).toFixed(2))
										: selectedProductPrice.capital_price.toFixed(2) ||
											'0.00';
								}}
							/>
							<span className="absolute bottom-0 left-0 ml-3 -translate-y-1/2 text-sm font-semibold text-gray-500">
								₱
							</span>
						</div>
						<div className="col-span-2 grid grid-cols-5 gap-1">
							<div className="relative col-span-2 flex flex-col justify-center gap-1">
								<Label
									htmlFor="markup"
									className="text-sm font-bold text-gray-600"
								>
									Markup
								</Label>
								<Input
									id="markup"
									name="markup"
									type="number"
									inputMode="numeric"
									min={0}
									max={1000}
									step={0.001}
									required
									placeholder={'0'}
									value={markupPercentage.toString()}
									onChange={e => {
										setMarkupPercentage(
											currency(e.target.value, { precision: 3 })
												.value,
										);
									}}
									onBlur={e => {
										e.target.value = markupPercentage.toString();
									}}
								/>
								<span className="absolute bottom-0 right-0 mr-2 -translate-y-1/2 text-sm font-semibold text-gray-500">
									%
								</span>
							</div>
							<div className="relative col-span-3 flex flex-col justify-end gap-1">
								<Input
									id="markup_value"
									name="markup_value"
									type="number"
									min={0}
									max={1000}
									readOnly
									placeholder={'0'}
									className="pl-7"
									value={
										FormValue.markup_price?.toFixed(2) ||
										selectedProductPrice.markup_price.toFixed(2) ||
										'0.00'
									}
								/>
								<span className="absolute bottom-0 left-0 ml-3 -translate-y-1/2 text-sm font-semibold text-gray-500">
									₱
								</span>
							</div>
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
								inputMode="numeric"
								min={0}
								step={0.01}
								required
								placeholder={'0.00'}
								className="pl-7"
								value={
									FormValue.tax_amount ||
									selectedProductPrice.tax_amount.toFixed(2) ||
									'0.00'
								}
								onChange={e => {
									handleChange(
										'tax_amount',
										currency(e.target.value).value,
									);
								}}
								onBlur={e => {
									FormValue.tax_amount !== undefined
										? (e.target.value = Number(
												FormValue.tax_amount,
											).toFixed(2))
										: selectedProductPrice.tax_amount.toFixed(2) ||
											'0.00';
								}}
							/>
							<span className="absolute bottom-0 left-0 ml-3 -translate-y-1/2 text-sm font-semibold text-gray-500">
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
								required
								className="pl-7"
								readOnly
								value={
									FormValue.cost?.toFixed(2) ||
									selectedProductPrice.cost.toFixed(2) ||
									'0.00'
								}
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
								inputMode="numeric"
								min={0}
								step={0.01}
								max={
									FormValue.cost !== undefined
										? FormValue.cost
										: selectedProductPrice.cost
								}
								disabled={
									FormValue.on_sale === undefined
										? selectedProductPrice.on_sale === 0
										: FormValue.on_sale === 0
								}
								required
								placeholder="0.00"
								className="pl-7"
								value={
									FormValue.sale_discount ||
									selectedProductPrice.sale_discount?.toFixed(2) ||
									'0.00'
								}
								onChange={e => {
									handleChange(
										'sale_discount',
										currency(e.target.value).value,
									);
								}}
								onBlur={e => {
									e.target.value = Number(
										FormValue.sale_discount !== undefined
											? FormValue.sale_discount
											: selectedProductPrice.sale_discount,
									).toFixed(2);
								}}
							/>
							<span className="absolute bottom-0 left-0 ml-3 -translate-y-1/2 text-sm font-semibold text-gray-500">
								₱
							</span>
							<div className="absolute right-0 top-1/2 mr-2 flex flex-none translate-y-1/4 flex-row items-center justify-start gap-2">
								<Input
									name="on_sale"
									id="on_sale"
									type="checkbox"
									checked={
										FormValue.on_sale === undefined
											? selectedProductPrice.on_sale === 1
											: FormValue.on_sale === 1
									}
									className="h-4 w-fit"
									onChange={e => {
										const saleDiscountInput = document.getElementById(
											'sale_discount',
										) as HTMLInputElement;
										handleChange('on_sale', e.target.checked ? 1 : 0);
										!e.target.checked &&
											(handleChange('sale_discount', 0),
											saleDiscountInput &&
												(saleDiscountInput.value = '0.00'));
									}}
								/>
								<Label
									htmlFor="on_sale"
									className="text-xs font-bold text-slate-700"
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
								required
								readOnly
								className="pl-7"
								value={
									FormValue.price?.toFixed(2) ||
									selectedProductPrice.price.toFixed(2) ||
									'0.00'
								}
							/>
							<span className="absolute bottom-0 left-0 ml-3 -translate-y-1/2 text-sm font-semibold text-gray-500">
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
								onValueChange={value => {
									handleChange('approval_status', value);
									value === 'approved'
										? handleChange('approved_by', auth.user.id) // if changed to 'approved', update 'approved_by'
										: handleChange('approved_by', ''); // if changed to 'pending' or 'rejected', remove 'approved_by'
								}}
								value={
									FormValue.approval_status ||
									selectedProductPrice.approval_status ||
									''
								}
								required
							>
								<SelectTrigger
									name="approval_status"
									className="flex flex-row items-center gap-3 bg-white text-sm capitalize"
								>
									<SelectValue
										placeholder={
											FormValue.approval_status ||
											selectedProductPrice.approval_status ||
											'Select status...'
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
								disabled={isSubmitting} // Disable button if form is submitting
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
