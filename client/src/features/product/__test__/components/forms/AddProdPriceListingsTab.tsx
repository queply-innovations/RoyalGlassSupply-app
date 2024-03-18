import { Product, ProductPricesDatabase } from '../../types';
import { Loader2 } from 'lucide-react';
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
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';
import { Button } from '@/components';
import { useProductPricesMutation } from '../../hooks';
import currency from 'currency.js';

interface AddProdPriceListingsTabProps {
	product: Product;
	setOpenedTab: React.Dispatch<React.SetStateAction<string>>;
	onClose: () => void;
}
export const AddProdPriceListingsTab = ({
	product,
	setOpenedTab,
	onClose,
}: AddProdPriceListingsTabProps) => {
	const { auth } = useAuth();
	const { warehouses } = useWarehouseQuery();
	const {
		value: FormValue,
		setValue: setFormValue,
		handleChange,
		handleSubmit,
	} = useProductPricesMutation();

	// States for form submission and error message
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const [markupPercentage, setMarkupPercentage] = useState<number>(0);

	useEffect(() => {
		// Initialize form values that may be not set in the form
		setFormValue(
			_prev =>
				({
					..._prev,
					product_id: product.id,
					active_status: 'active',
					approval_status: 'pending',
					created_by: auth.user.id,
					on_sale: 0,
					sale_discount: 0,
				}) as Partial<ProductPricesDatabase>,
		);
	}, []);

	// Markup value calculation
	useEffect(() => {
		const capitalPrice = FormValue.capital_price || 0;
		const markup = currency(capitalPrice).multiply(
			(markupPercentage || 0) / 100,
		);

		handleChange('markup_price', markup.value);
	}, [FormValue.capital_price, markupPercentage]);

	// Cost value calculation
	useEffect(() => {
		const capitalPrice = FormValue.capital_price || 0;
		const markupPrice = FormValue.markup_price || 0;
		const taxAmount = FormValue.tax_amount || 0;

		handleChange(
			'cost',
			currency(capitalPrice).add(markupPrice).add(taxAmount).value,
		);
	}, [FormValue.capital_price, FormValue.markup_price, FormValue.tax_amount]);

	// Price value calculation
	useEffect(() => {
		const cost = FormValue.cost || 0;
		const saleDiscount = FormValue.sale_discount || 0;

		handleChange('price', currency(cost).subtract(saleDiscount).value);
	}, [FormValue.cost, FormValue.sale_discount]);

	return (
		<>
			<form
				onSubmit={async e => {
					setIsSubmitting(!isSubmitting);
					e.preventDefault();
					const response = await handleSubmit({
						action: 'add',
						data: FormValue,
					});
					response?.status === 201 // 201 means resource successfully created
						? (setIsSubmitting(!isSubmitting), onClose())
						: (setIsSubmitting(!isSubmitting),
							setError('Failed to add product listing'));
				}}
			>
				<div className="flex max-w-2xl flex-col gap-3 font-medium">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Name</h3>
							<p className="text-sm">{product.name}</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Product ID
							</h3>
							<p className="text-sm">{product.id}</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Serial Number
							</h3>
							<p className="text-sm">{product.serial_no}</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Size</h3>
							<p className="text-sm">{product.size}</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Color</h3>
							<p className="text-sm">{product.color}</p>
						</div>
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="warehouse"
								className="text-sm font-bold text-gray-600"
							>
								Warehouse
							</Label>
							<Select
								onValueChange={value =>
									handleChange('warehouse_id', Number(value))
								}
								required
							>
								<SelectTrigger
									name="warehouse"
									className="flex flex-row items-center gap-3 truncate bg-white text-sm"
								>
									<SelectValue placeholder={'Choose warehouse...'} />
								</SelectTrigger>
								<SelectContent className="bg-white font-medium">
									{warehouses.length <= 0 ? (
										<div className="flex h-12 w-full items-center justify-center">
											<Loader2
												size={22}
												strokeWidth={2.5}
												className="animate-spin text-slate-700/50"
											/>
										</div>
									) : (
										warehouses.map(warehouse => (
											<SelectItem
												key={warehouse.code}
												value={warehouse.id.toString()}
												className="text-sm font-medium text-slate-700"
											>
												{warehouse.name}

												<span className="truncate text-xs text-slate-700/60">
													{' • ' +
														warehouse.code +
														' • ' +
														warehouse.location}
												</span>
											</SelectItem>
										))
									)}
								</SelectContent>
							</Select>
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
								required
							>
								<SelectTrigger
									name="type"
									className="flex flex-row items-center gap-3 bg-white text-sm"
								>
									<SelectValue placeholder={'Choose type...'} />
								</SelectTrigger>
								<SelectContent className="bg-white font-medium">
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
								placeholder={'e.g. pcs...'}
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
								placeholder={'e.g. 100...'}
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
								placeholder={'e.g. pcs...'}
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
								inputMode="numeric"
								min={0}
								step={0.01}
								required
								placeholder={'0.00'}
								className="pl-7"
								onChange={e => {
									handleChange(
										'capital_price',
										currency(e.target.value).value,
									);
								}}
								onBlur={e => {
									e.target.value = Number(
										FormValue.capital_price,
									).toFixed(2);
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
									step={0.01}
									required
									placeholder={'0'}
									onChange={e => {
										setMarkupPercentage(
											currency(e.target.value).value,
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
									step={0.01}
									readOnly
									placeholder={'0'}
									className="pl-7"
									value={
										FormValue.markup_price
											? FormValue.markup_price.toFixed(2)
											: '0.00'
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
								onChange={e => {
									handleChange(
										'tax_amount',
										currency(e.target.value).value,
									);
								}}
								onBlur={e => {
									e.target.value = Number(
										FormValue.tax_amount,
									).toFixed(2);
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
									FormValue.cost ? FormValue.cost.toFixed(2) : '0.00'
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
								placeholder="0.00"
								className="pl-7"
								value={
									FormValue.sale_discount !== 0
										? FormValue.sale_discount
										: ''
								}
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
									defaultChecked={false}
									className="h-4 w-fit"
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
								value={
									FormValue.price ? FormValue.price.toFixed(2) : '0.00'
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
								defaultChecked={true}
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
							<Label
								htmlFor="approval_status"
								className="text-sm font-bold text-gray-600"
							>
								Approval status
							</Label>
							<Select
								onValueChange={value => {
									handleChange('approval_status', value);
									value === 'approved' &&
										handleChange('approved_by', auth.id); // if changed to 'approved', update 'approved_by'
								}}
								defaultValue={'pending'}
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
							disabled={
								isSubmitting || Object.keys(FormValue).length <= 6
							} // Disable button if there are no changes or form is submitting
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
