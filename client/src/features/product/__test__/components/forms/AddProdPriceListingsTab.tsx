import { ProductPricesDatabase } from '../../types';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
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
import { Button } from '@/components';
import { useProductPricesMutation } from '../../hooks';
import currency from 'currency.js';
import { Warehouse } from '@/features/warehouse/__test__/types';
import {
	getMarkupPercentage,
	getMarkupValue,
	getCostValue,
	getPriceValue,
} from '../../helpers/useProductPriceCalculations';
import { toast } from 'react-toastify';
import { useProducts } from '../../context/ProductContext';

interface AddProdPriceListingsTabProps {
	selectedWarehouse: Warehouse;
	setOpenedTab: React.Dispatch<React.SetStateAction<string>>;
	onClose: () => void;
}
export const AddProdPriceListingsTab = ({
	selectedWarehouse,
	setOpenedTab,
	onClose,
}: AddProdPriceListingsTabProps) => {
	const { auth } = useAuth();
	const { selectedProduct, setSelectedProduct } = useProducts();
	const {
		value: FormValue,
		setValue: setFormValue,
		handleChange,
		handleSubmit,
	} = useProductPricesMutation();

	// States for form submission and error message
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Initialize form values that may be not set in the form
		setFormValue(
			_prev =>
				({
					..._prev,
					product_id: selectedProduct?.id,
					warehouse_id: selectedWarehouse.id,
					unit: 'pcs',
					active_status: 'active',
					approval_status: 'pending',
					created_by: auth.user.id,
					on_sale: 0,
					sale_discount: 0,
				}) as Partial<ProductPricesDatabase>,
		);
	}, []);

	const [capitalPrice, setCapitalPrice] = useState<number>(0);
	const [markupPercent, setMarkupPercent] = useState<number>(10);
	const [markupValue, setMarkupValue] = useState<number>(0);

	const handleCapitalPriceChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value;
		setCapitalPrice(currency(value).value);
		handleChange('capital_price', currency(value).value);
		setMarkupValue(getMarkupValue(currency(value).value, markupPercent));
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
			getPriceValue(FormValue.cost ?? 0, FormValue.sale_discount ?? 0),
		);
	}, [FormValue.cost, FormValue.sale_discount]);

	return (
		<>
			<form
				onSubmit={e => {
					setIsSubmitting(!isSubmitting);
					e.preventDefault();
					handleSubmit({
						action: 'add',
						data: FormValue,
					})
						.then(() => {
							setIsSubmitting(!isSubmitting);
							setSelectedProduct(undefined);
							toast.success('Product listing added successfully');
							onClose();
						})
						.catch(() => {
							setIsSubmitting(!isSubmitting);
							setError('Failed to add product listing');
							toast.error('Failed to add product listing');
						});
				}}
			>
				<div className="flex max-w-2xl flex-col gap-3 font-medium">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-x-3 gap-y-5">
						<div className="col-span-12 grid grid-flow-row grid-cols-12 gap-4 text-sm text-slate-700">
							<div className="col-span-4 flex flex-col gap-1">
								<h3 className="font-bold">Name</h3>
								<p className="font-medium">{selectedProduct?.name}</p>
							</div>
							<div className="col-span-4 flex flex-col gap-1">
								<h3 className="font-bold">Serial Number</h3>
								<p className="font-medium">
									{selectedProduct?.serial_no}
								</p>
							</div>
							<div className="col-span-4 flex flex-col gap-1">
								<h3 className="font-bold">Brand</h3>
								<p className="font-medium">
									{selectedProduct?.brand || (
										<span className="opacity-60">No brand</span>
									)}
								</p>
							</div>
							<div className="col-span-4 flex flex-col justify-center gap-1">
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
									value={FormValue.unit || ''}
									onChange={e => {
										handleChange('unit', e.target.value);
									}}
								/>
							</div>
							<div className="col-span-4 flex flex-col gap-1">
								<h3 className="font-bold">Size</h3>
								<p className="font-medium">{selectedProduct?.size}</p>
							</div>
							<div className="col-span-4 flex flex-col gap-1">
								<h3 className="font-bold">Color</h3>
								<p className="font-medium">{selectedProduct?.color}</p>
							</div>
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
								autoFocus
								className="pl-7"
								value={capitalPrice || ''}
								onChange={handleCapitalPriceChange}
								onBlur={e => {
									e.target.value = Number(capitalPrice || 0).toFixed(
										2,
									);
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
							<span className="absolute bottom-0 left-0 ml-3 -translate-y-1/2 text-sm font-semibold text-gray-500">
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
								max={FormValue.cost || 0}
								step={0.01}
								disabled={
									FormValue.on_sale === undefined
										? true
										: FormValue.on_sale === 0
								}
								required
								className="pl-7"
								value={FormValue.sale_discount || ''}
								onChange={e => {
									handleChange(
										'sale_discount',
										currency(e.target.value).value,
									);
								}}
								onBlur={e => {
									e.target.value = Number(
										FormValue.sale_discount,
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
									className="h-4 w-fit"
									checked={!!FormValue.on_sale}
									onChange={e => {
										handleChange('on_sale', e.target.checked ? 1 : 0);
										handleChange('sale_discount', 0);
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
								value={FormValue.price?.toFixed(2) || '0.00'}
							/>
							<span className="absolute bottom-0 left-0 ml-3 -translate-y-1/2 text-sm font-semibold text-gray-500">
								₱
							</span>
						</div>
					</div>
					<hr className="my-2 h-px w-full border-0 bg-gray-200" />
					<div className="grid w-full grid-flow-row grid-cols-12 gap-3">
						<div className="col-span-4 flex flex-row items-center justify-start gap-3">
							<Switch
								id="active_status"
								name="active_status"
								className="data-[state=checked]:bg-primary-green data-[state=unchecked]:bg-gray-300"
								checked={FormValue.active_status === 'active' || false}
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
							<Label
								htmlFor="approval_status"
								className="text-sm font-bold text-gray-600"
							>
								Approval status
							</Label>
							<Select
								defaultValue={'pending'}
								value={FormValue.approval_status || ''}
								onValueChange={value => {
									handleChange('approval_status', value);
									value === 'approved' &&
										handleChange('approved_by', auth.user.id); // if changed to 'approved', update 'approved_by'
								}}
								required
							>
								<SelectTrigger
									name="approval_status"
									className="flex flex-row items-center gap-3 bg-white text-sm capitalize"
								>
									<SelectValue placeholder={'pending'} />
								</SelectTrigger>
								<SelectContent className="bg-white font-medium">
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
								</SelectContent>
							</Select>
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<Label
								htmlFor="created_by"
								className="text-sm font-bold text-gray-600"
							>
								Created by
							</Label>
							<Input
								name="created_by"
								className="text-sm disabled:pointer-events-none"
								readOnly
								disabled
								value={
									auth.user
										? auth.user.firstname + ' ' + auth.user.lastname
										: ''
								}
							/>
						</div>
					</div>
					<div className="flex w-full flex-row justify-between whitespace-nowrap pt-4">
						<Button
							fill={'default'}
							onClick={() => setOpenedTab('product')}
							className={`flex-0 py-2 text-sm font-bold text-slate-700 hover:text-white`}
						>
							Go back
						</Button>
						<Button
							type="submit"
							fill={'green'}
							disabled={isSubmitting} // Disable button if no type or form is submitting
							className="max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
						>
							{!isSubmitting ? 'Add listing' : 'Submitting...'}
						</Button>
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
