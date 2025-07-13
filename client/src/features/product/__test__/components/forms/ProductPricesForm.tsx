import { UseModalProps } from '@/utils/Modal';
import { useProductPricesMutation } from '../../hooks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { formatUTCDate } from '@/utils/timeUtils';
import { Button } from '@/components';
import currency from 'currency.js';
import {
	getMarkupPercentage,
	getMarkupValue,
	getCostValue,
	getPriceValue,
} from '../../helpers/useProductPriceCalculations';
import { toast } from 'react-toastify';
import { useProductPricesPaginated } from '../../context/ProductPricesPaginatedContext';

interface ProductPricesFormProps {
	onClose: UseModalProps['closeModal'];
}

export const ProductPricesForm = ({ onClose }: ProductPricesFormProps) => {
	const { selectedProductPrice } = useProductPricesPaginated();
	const {
		value: FormValue,
		handleChange,
		handleSubmit,
	} = useProductPricesMutation();

	// States for form submission and error message
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const [markupPercent, setMarkupPercent] = useState<number>(
		getMarkupPercentage(
			selectedProductPrice?.capital_price ?? 0,
			selectedProductPrice?.markup_price ?? 0,
			3,
		),
	);
	const [markupValue, setMarkupValue] = useState<number>(
		selectedProductPrice?.markup_price ?? 0,
	);

	const handleMarkupPercentChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = Number(e.target.value);
		setMarkupPercent(value);
		setMarkupValue(
			getMarkupValue(selectedProductPrice?.capital_price ?? 0, value),
		);
	};

	const handleMarkupValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = currency(e.target.value).value;
		setMarkupValue(value);
		setMarkupPercent(
			getMarkupPercentage(
				selectedProductPrice?.capital_price ?? 0,
				value,
				3,
			),
		);
	};

	useEffect(() => {
		handleChange('markup_price', markupValue);
		handleChange(
			'cost',
			getCostValue(selectedProductPrice?.capital_price ?? 0, markupValue),
		);
	}, [markupPercent, markupValue]);

	useEffect(() => {
		handleChange(
			'price',
			getPriceValue(
				FormValue.cost ?? selectedProductPrice?.cost ?? 0,
				FormValue.sale_discount ?? selectedProductPrice?.sale_discount ?? 0,
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
						id: selectedProductPrice?.id ?? -1,
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
								{selectedProductPrice?.product.name ?? 'No name'}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Brand</h3>
							<p className="text-sm">
								{/* Brand is possibly empty string */}
								{selectedProductPrice?.product.brand || 'No brand'}
							</p>
						</div>
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Serial Number
							</h3>
							<p className="text-sm">
								{selectedProductPrice?.product.serial_no ??
									'No serial number'}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Unit</h3>
							<p className="text-sm">
								{selectedProductPrice?.inventory_product.unit ??
									'No unit'}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Size</h3>
							<p className="text-sm">
								{selectedProductPrice?.product.size ?? 'No size'}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Color</h3>
							<p className="text-sm">
								{selectedProductPrice?.product.color ?? 'No color'}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Inventory
							</h3>
							<p className="text-sm">
								{selectedProductPrice?.inventory_product.inventory
									.code ?? 'No inventory'}
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
								disabled
								className="pl-7"
								value={
									currency(selectedProductPrice?.capital_price ?? 0)
										.value
								}
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
								step={0.001}
								required
								value={markupPercent || ''}
								onChange={handleMarkupPercentChange}
								onBlur={e => {
									// If input is empty or 0, set markup percent to 0
									if (
										e.target.value === '' ||
										e.target.value === '0'
									) {
										setMarkupPercent(0);
										setMarkupValue(0);
									} else {
										// Adjusts the markup value so the cost will be rounded to the nearest 0.5
										const roundedCost =
											Math.round(
												((selectedProductPrice?.capital_price ??
													0) +
													(selectedProductPrice?.capital_price ??
														0) *
														(Number(e.target.value) / 100)) *
													2,
											) / 2;
										const adjustedMarkupValue =
											roundedCost -
											(selectedProductPrice?.capital_price ?? 0);
										setMarkupValue(
											currency(adjustedMarkupValue).value,
										);
										setMarkupPercent(
											getMarkupPercentage(
												selectedProductPrice?.capital_price ?? 0,
												adjustedMarkupValue,
												3,
											),
										);
									}
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
								step={0.01}
								className="pl-7"
								value={markupValue || ''}
								onChange={handleMarkupValueChange}
								onBlur={e => {
									// If input is empty or 0, set markup value to 0
									if (
										e.target.value === '' ||
										e.target.value === '0'
									) {
										setMarkupValue(0);
										setMarkupPercent(0);
									} else {
										// Adjusts the markup value so the cost will be rounded to the nearest 0.5
										const roundedCost =
											Math.round(
												((selectedProductPrice?.capital_price ??
													0) +
													Number(e.target.value)) *
													2,
											) / 2;
										const adjustedMarkupValue =
											roundedCost -
											(selectedProductPrice?.capital_price ?? 0);
										setMarkupValue(
											currency(adjustedMarkupValue).value,
										);
										setMarkupPercent(
											getMarkupPercentage(
												selectedProductPrice?.capital_price ?? 0,
												adjustedMarkupValue,
												3,
											),
										);
									}
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
									getCostValue(
										selectedProductPrice?.capital_price ?? 0,
										markupValue,
									).toFixed(2) || '0.00'
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
										: selectedProductPrice?.cost ?? 0
								}
								disabled={
									FormValue.on_sale === undefined
										? (selectedProductPrice?.on_sale ?? 0) === 0
										: FormValue.on_sale === 0
								}
								required
								className="pl-7"
								value={
									FormValue.sale_discount ??
									(selectedProductPrice?.sale_discount ?? 0).toFixed(
										2,
									) ??
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
											: selectedProductPrice?.sale_discount ?? 0,
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
											? (selectedProductPrice?.on_sale ?? 0) === 1
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
									(selectedProductPrice?.price ?? 0).toFixed(2) ||
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
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Created by
							</h3>
							<p className="text-sm">
								{selectedProductPrice?.created_by.firstname +
									' ' +
									selectedProductPrice?.created_by.lastname}
							</p>
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Created at
							</h3>
							<p className="text-sm">
								{selectedProductPrice?.created_at
									? formatUTCDate(selectedProductPrice.created_at)
									: 'No data'}
							</p>
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Updated at
							</h3>
							<p className="text-sm">
								{selectedProductPrice?.updated_at
									? formatUTCDate(selectedProductPrice.updated_at)
									: 'No data'}
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
