import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInventoryProductsByInventory } from '@/features/inventory/context';
import { useInventoryProdsMutation } from '@/features/inventory/hooks';
import { UseModalProps } from '@/utils/Modal';
import { MoveRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ApproveInventoryProductProps {
	onClose: UseModalProps['closeModal'];
}

export const ApproveInventoryProduct = ({
	onClose,
}: ApproveInventoryProductProps) => {
	const { selectedInventoryProduct } = useInventoryProductsByInventory();
	const {
		value: FormValue,
		handleChange,
		handleSubmit,
	} = useInventoryProdsMutation();

	// useEffect(() => {
	// 	handleChange('status', 1);
	// 	if (selectedInventoryProduct.approved_stocks) {
	// 		handleChange(
	// 			'approved_stocks',
	// 			selectedInventoryProduct.approved_stocks,
	// 		);
	// 	} else {
	// 		handleChange('approved_stocks', selectedInventoryProduct.stocks_count);
	// 	}
	// }, [selectedInventoryProduct]);

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const handleApprove = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		handleSubmit({
			action: 'update',
			id: selectedInventoryProduct.id,
			data: FormValue,
		})
			.then(() => {
				toast.success('Inventory product successfully approved.');
				setIsSubmitting(false);
				onClose();
			})
			.catch(error => {
				toast.error(error?.response?.data?.message);
				setIsSubmitting(false);
			});
	};

	return (
		<>
			<div className="flex min-w-[24rem] max-w-2xl flex-col gap-3">
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-5">
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Name</h3>
						<p className="text-sm">
							{selectedInventoryProduct.product.name}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Serial No.
						</h3>
						<p className="text-sm">
							{selectedInventoryProduct.product.serial_no}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Brand</h3>
						<p className="text-sm">
							{selectedInventoryProduct.product.brand || (
								<span className="opacity-50">No brand</span>
							)}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Size</h3>
						<p className="text-sm">
							{selectedInventoryProduct.product.size}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Color</h3>
						<p className="text-sm">
							{selectedInventoryProduct.product.color}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Color</h3>
						<p className="text-sm">
							{selectedInventoryProduct.product.color}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Supplier</h3>
						<p className="text-sm">
							{selectedInventoryProduct.supplier_id.name}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-12 gap-5">
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Capital Price
						</h3>
						<p className="text-sm">
							{Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'PHP',
							}).format(selectedInventoryProduct.capital_price)}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Stocks</h3>
						<p className="text-sm">
							{selectedInventoryProduct.stocks_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Damaged</h3>
						<p className="text-sm">
							{selectedInventoryProduct.damage_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Total</h3>
						<p className="text-sm">
							{selectedInventoryProduct.total_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Transferred
						</h3>
						<p className="text-sm">
							{selectedInventoryProduct.transferred_stocks_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Sold</h3>
						<p className="text-sm">
							{selectedInventoryProduct.sold_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Miscellaneous
						</h3>
						<p className="text-sm">
							{selectedInventoryProduct.miscellaneous_count}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Remaining Stocks
						</h3>
						<p className="text-sm">
							{selectedInventoryProduct.remaining_stocks_count}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<form
					className="grid w-full grid-flow-row grid-cols-11 gap-3"
					onSubmit={handleApprove}
				>
					<div className="relative col-span-5 flex flex-col justify-center gap-1">
						<Label
							htmlFor="approved_stocks"
							className="text-sm font-bold text-gray-600"
						>
							Approve stocks
						</Label>
						<Input
							id="approved_stocks"
							name="approved_stocks"
							type="number"
							min={0}
							step={1}
							max={selectedInventoryProduct.remaining_unapproved_stocks}
							required
							autoFocus
							value={
								FormValue.approved_stocks !== undefined
									? String(FormValue.approved_stocks)
									: ''
							}
							onChange={e => {
								handleChange('approved_stocks', e.target.value);
							}}
							onBlur={e => {
								handleChange('approved_stocks', Number(e.target.value));
							}}
						/>
						<span className="absolute bottom-0 right-0 -translate-x-4 -translate-y-2 pb-[2px] text-sm font-medium text-slate-700">
							/ {selectedInventoryProduct.remaining_unapproved_stocks}
						</span>
					</div>
					<div className="col-span-1 flex items-center pt-6">
						<MoveRight
							size={24}
							strokeWidth={2}
							className="mx-auto text-slate-600"
						/>
					</div>
					<div className="col-span-5 flex flex-col justify-center gap-1">
						<Label
							htmlFor="prev_approved_stocks"
							className="text-sm font-bold text-gray-600"
						>
							Total approved stocks
						</Label>
						<Input
							id="prev_approved_stocks"
							name="prev_approved_stocks"
							type="number"
							readOnly
							value={selectedInventoryProduct.approved_stocks || 0}
						/>
					</div>
					<div className="col-span-11 flex w-full justify-between whitespace-nowrap pt-3">
						<div className="ml-auto flex flex-row gap-4">
							<Button
								fill={'default'}
								type="reset"
								onClick={() => onClose()}
								className="flex-1 py-2 text-sm font-bold text-slate-700 hover:text-white"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								fill={'green'}
								disabled={
									isSubmitting
									// (FormValue.approved_stocks ?? 0) <=
									// 	selectedInventoryProduct.approved_stocks
								}
								className="max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
							>
								{!isSubmitting ? 'Approve' : 'Approving...'}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
