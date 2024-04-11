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
import {
	getMarkupPercentage,
	getMarkupValue,
	getCostValue,
	getPriceValue,
} from '../../helpers/useProductPriceCalculations';
import { toast } from 'react-toastify';

interface ProductPricesFormProps {
	onClose: UseModalProps['closeModal'];
}

export const ProductPricesForm = ({ onClose }: ProductPricesFormProps) => {
	const { auth } = useAuth();
	const { selectedProductPrice } = useProductPrices();
	const {
		value: FormValue,
		handleChange,
		handleSubmit,
	} = useProductPricesMutation();

	// States for form submission and error message
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const [capitalPrice, setCapitalPrice] = useState<number>(
		selectedProductPrice.capital_price,
	);
	const [markupPercent, setMarkupPercent] = useState<number>(
		getMarkupPercentage(
			selectedProductPrice.capital_price,
			selectedProductPrice.markup_price,
			3,
		),
	);
	const [markupValue, setMarkupValue] = useState<number>(
		selectedProductPrice.markup_price,
	);

	const handleCapitalPriceChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value;
		setCapitalPrice(currency(value).value);
		handleChange('capital_price', currency(value).value);
		setMarkupValue(getMarkupValue(currency(value).value, markupPercent || 0));
	};

	const handleMarkupPercentChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = Number(e.target.value);
		setMarkupPercent(value);
		setMarkupValue(getMarkupValue(capitalPrice, value));
	};

	const handleMarkupValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = currency(e.target.value).value;
		setMarkupValue(value);
		setMarkupPercent(getMarkupPercentage(capitalPrice, value, 3));
	};

	useEffect(() => {
		handleChange('capital_price', capitalPrice);
		handleChange('markup_price', markupValue);
		handleChange('cost', getCostValue(capitalPrice, markupValue));
	}, [capitalPrice, markupPercent, markupValue]);

	useEffect(() => {
		handleChange(
			'price',
			getPriceValue(
				FormValue.cost ?? selectedProductPrice.cost,
				FormValue.sale_discount ?? selectedProductPrice.sale_discount,
			),
		);
	}, [FormValue.cost, FormValue.sale_discount]);

	return (
		<>
			<form
				onSubmit={async e => {
					setIsSubmitting(!isSubmitting);
					e.preventDefault();
					handleSubmit({
						action: 'update',
						id: selectedProductPrice.id,
						data: FormValue,
					})
						.then(() => {
							setIsSubmitting(!isSubmitting);
							toast.success('Product price edited successfully');
							onClose();
						})
						.catch(() => {
							setIsSubmitting(!isSubmitting);
							setError('Failed to add product listing');
							toast.error('Failed to add product listing');
						});
				}}
			>
				<div className="flex max-w-2xl flex-col gap-3">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-x-4 gap-y-5 font-medium text-gray-700">
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Name</h3>
							<p className="text-sm">
								{selectedProductPrice.product.name}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Brand</h3>
							<p className="text-sm">
								{selectedProductPrice.product.brand || (
									<span className="opacity-60">No brand</span>
								)}
							</p>
						</div>
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Serial Number
							</h3>
							<p className="text-sm">
								{selectedProductPrice.product.serial_no}
							</p>
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
								maxLength={20}
								required
								value={FormValue.unit || selectedProductPrice.unit}
								onChange={e => {
									handleChange('unit', e.target.value);
								}}
							/>
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
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Warehouse
							</h3>
							<p className="text-sm">
								{selectedProductPrice.warehouse.name}
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
								className="pl-7"
								value={capitalPrice || ''}
								onChange={handleCapitalPriceChange}
								onBlur={e => {
									e.target.value = Number(capitalPrice).toFixed(2);
								}}
							/>
							<span className="absolute bottom-0 left-0 ml-3 -translate-y-1/2 text-sm font-semibold text-gray-500">
								₱
							</span>
						</div>
						<div className="relative col-span-2 flex flex-col justify-center gap-1">
							<Label
								htmlFor="markup_percent"
								className="text-sm font-bold text-gray-600"
							>
								Markup percent
							</Label>
							<Input
								id="markup_percent"
								name="markup_percent"
								type="number"
								inputMode="numeric"
								min={0}
								max={1000}
								step={0.001}
								required
								value={markupPercent || ''}
								onChange={handleMarkupPercentChange}
								onBlur={e => {
									e.target.value = currency(markupPercent, {
										precision: 3,
									}).value.toString();
								}}
							/>
							<span className="absolute bottom-0 right-0 mr-2 -translate-y-1/2 text-sm font-semibold text-gray-500">
								%
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
								max={1000}
								step={0.01}
								className="pl-7"
								value={markupValue || ''}
								onChange={handleMarkupValueChange}
								onBlur={e => {
									e.target.value = Number(markupValue).toFixed(2);
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
									getCostValue(capitalPrice, markupValue).toFixed(2) ||
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
								className="pl-7"
								value={
									FormValue.sale_discount ??
									selectedProductPrice.sale_discount?.toFixed(2) ??
									''
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
					<div className="col-span-12 flex w-full justify-between whitespace-nowrap pt-4">
						<div className="ml-auto flex flex-row gap-4">
							<Button
								type="reset"
								fill={'default'}
								className="flex-1 py-2 text-sm font-bold text-slate-700 hover:text-white"
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
