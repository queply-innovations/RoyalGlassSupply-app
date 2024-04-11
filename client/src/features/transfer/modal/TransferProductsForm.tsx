import { UseModalProps } from '@/utils/Modal';
import { Button, Inputbox, Loading, Selectbox } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
import { useTransfer } from '../context/TransferContext';
import { useProductAddition, useTransferAddition } from '../hooks';
import { Roles } from '@/entities';
import user from '@/store/user';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { 
	Select, 
	SelectContent, 
	SelectItem, 
	SelectTrigger, 
	SelectValue } 
	from '@/components/ui/select';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';
import { useAuth } from '@/context/AuthContext';

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Textarea } from '@/components/ui/textarea';

interface TransferProductsProps {
	onClose: UseModalProps['closeModal'];
}

export const TransferProductsForm = ({ onClose }: TransferProductsProps) => {
	const {
		product,
		allProducts,
		allInventoryProducts,
		filteredProductsSrc,
		bundlesLimit,
		quantityLimit,
		damagedCount,
		isChanged,
		isSubmitting,
		error,
		success,
		handleSubmit,
		handleChange,
		handleChangeSelect,
	} = useProductAddition();

	const { auth } = useAuth();

	const priceAmount = product.capital_price
		? product.capital_price
		: 0;

	const priceLabel = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "PHP",
	}).format(priceAmount);

	success && setTimeout(() => {
		onClose();
	}, 1000);

	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
				}}
			>
				<div className="flex max-w-6xl flex-col gap-5">
					<div className="grid grid-cols-12 gap-3 justify-center">
						<div className="flex flex-col col-span-3 gap-1">
							<span className="text-sm font-bold uppercase">
								Transfer Product ID
							</span>
							<Inputbox
								name="id"
								value={product.id}
								type="number"
								disabled
								readOnly
							/>
						</div>
						<div className="flex flex-col col-span-2 gap-1">
							<span className="text-sm font-bold uppercase">
								Transfer ID
							</span>
							<Inputbox
								name="created_by"
								placeholder="User ID"
								value={product.transfer_id}
								disabled
								readOnly
							/>
						</div>

						<div className="flex flex-col col-span-4 gap-1">
							<span className="text-sm font-bold uppercase">
								Product to transfer:
							</span>
							<Select
								onValueChange={value => 
									handleChangeSelect('product_id', Number(value.split('-')[0]), Number(value.split('-')[1]))}
								required
								name="product_id"
							>
								<SelectTrigger
									name="product_id"
									className="flex flex-row items-center gap-3 truncate bg-white text-sm"
								>
									<SelectValue placeholder={'Choose product...'} />
								</SelectTrigger>

								<SelectContent className="bg-white font-medium">
									{filteredProductsSrc.length <= 0 ? (
										<div className="flex h-12 w-full items-center justify-center">
											<Loader2
												size={22}
												strokeWidth={2.5}
												className="animate-spin text-slate-700/50"
											/>
										</div>
									) : (
										filteredProductsSrc.map((product, key) => (
											<SelectItem
												key={key}
												value={product.product.id ? 
													product.product.id.toString() + "-" + key.toString()
													: ''}
												className="text-sm font-medium text-slate-700"
											>
												{product.product.name}
											</SelectItem>
										))
									)}
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col col-span-3 gap-1">
							<span className="text-sm font-bold uppercase">
								Capital Price:
							</span>
							<Inputbox
								name="capital_price"
								type="string"
								value={priceLabel}
								onChange={handleChange}
								disabled
								readOnly
							/>
						</div>
					</div>

					<div className="flex flex-row gap-3 justify-center">
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								BUNDLES COUNT
							</span>
							<Inputbox
								name="bundles_count"
								type="number"
								value={product.bundles_count || ''}
								placeholder={`Available stocks: ${bundlesLimit}`}
								max={bundlesLimit}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								BUNDLES UNIT
							</span>
							<Inputbox
								name="bundles_unit"
								type="string"
								value={product.bundles_unit || ''}
								placeholder='box, bundle, etc.'
								disabled
								readOnly
							/>
						</div>
					</div>

					<div className="flex flex-row gap-3 justify-center">
					<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								QUANTITY PER BUNDLE
							</span>
							<Inputbox
								name="quantity_per_bundle"
								type="number"
								value={product.quantity_per_bundle || ''}
								placeholder='Quantity per bundle'
								onChange={handleChange}
								disabled
								readOnly
							/>
						</div>

						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								UNIT
							</span>
							<Inputbox
								name="unit"
								type="string"
								value={product.unit || ''}
								placeholder='box, pieces, etc.'
								disabled
								readOnly
							/>
						</div>

						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								TOTAL QUANTITY
							</span>
							<Inputbox
								name="total_quantity"
								type="string"
								value={product.total_quantity && product.unit ? 
									product.total_quantity.toString() + ' ' + product.unit.toString() 
									: ''}
								placeholder={`Available stocks: ${quantityLimit}`}
								onChange={handleChange}
								disabled
								readOnly
							/>
						</div>

						{product.total_quantity != 0 && damagedCount != 0 && product.total_quantity == quantityLimit && (
							<div className="grid content-center group">
								<AlertTriangle size={30} strokeWidth={2} className="self-center text-yellow-600" />
								<span className="text-nowrap absolute left-1/2 mx-auto -translate-x-10 -translate-y-2 rounded-md bg-gray-800 px-1 text-sm text-gray-100 transition-opacity opacity-0 group-hover:opacity-100">
									Some damaged goods ({damagedCount} {product.unit}) are included in the transfer.
								</span>
							</div>
						)}
					</div>
					
					<div className="flex flex-row justify-center gap-1">
						<div className="mt-3 grid w-full grid-flow-row grid-cols-8 gap-4 text-center">
							<div className="flex flex-col col-span-2 gap-3">
								<Button
									type="submit"
									fill={isChanged ? 'green' : null}
									disabled={isChanged ? false : true}
									onClick={handleSubmit}
								>
									{!isSubmitting ? 'Add Transfer' : 'Submitting'}
								</Button>
							</div>
							<div className="flex flex-col col-span-4 items-start">
								{success && (
									<div className="font-bold text-green-700">{success}</div>
								)}
								{error && (
									<div className="font-bold text-red-700">{error}</div>
								)}
								{!isSubmitting ? '' : 
									<div className="flex flex-col flex-wrap items-start"> 
										<Loading width={30} height={30} /> 
									</div>}
							</div>
							<div className="flex flex-col col-span-2 gap-3 items-end">
								<Button
									type="reset"
									fill={'red'}
									onClick={onClose}
								>
									Cancel
								</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};
