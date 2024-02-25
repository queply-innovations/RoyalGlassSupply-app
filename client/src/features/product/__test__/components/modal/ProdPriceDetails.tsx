import { UseModalProps } from '@/utils/Modal';
import { useProductPrices } from '../..';
import { Button, Inputbox } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';

interface ProdPriceDetailsProps {
	onClose: UseModalProps['closeModal'];
}

export const ProdPriceDetails = ({ onClose }: ProdPriceDetailsProps) => {
	const { selectedProductPrice } = useProductPrices();

	return (
		<>
			<div className="flex max-w-2xl flex-col gap-5">
				<div className="flex flex-row gap-5">
					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<label htmlFor="name" className="text-sm font-bold uppercase">
							Name
						</label>
						<Inputbox
							name="name"
							id="name"
							value={selectedProductPrice.product.name}
							disabled
							readOnly
						/>
					</div>
					<div className="flex min-w-0 flex-1 flex-row gap-2">
						<div className="flex min-w-0 flex-1 flex-col gap-1">
							<label
								htmlFor="type"
								className="text-sm font-bold uppercase"
							>
								Type
							</label>
							<Inputbox
								name="type"
								id="type"
								value={selectedProductPrice.type}
								disabled
								readOnly
							/>
						</div>
						<div className="flex min-w-0 flex-1 flex-col gap-1">
							<label
								htmlFor="id"
								className="text-sm font-bold uppercase"
							>
								Id
							</label>
							<Inputbox
								name="id"
								id="id"
								value={selectedProductPrice.product.id}
								disabled
								readOnly
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-row gap-5">
					<div className="flex min-w-0 flex-1 flex-row gap-2">
						<div className="flex min-w-0 flex-1 flex-col gap-1">
							<label
								htmlFor="size"
								className="text-sm font-bold uppercase"
							>
								Size
							</label>
							<Inputbox
								name="size"
								id="size"
								value={selectedProductPrice.product.size}
								disabled
								readOnly
							/>
						</div>
						<div className="flex min-w-0 flex-1 flex-col gap-1">
							<label
								htmlFor="color"
								className="text-sm font-bold uppercase"
							>
								Color
							</label>
							<Inputbox
								name="color"
								id="color"
								value={selectedProductPrice.product.color}
								disabled
								readOnly
							/>
						</div>
					</div>
					<div className="flex min-w-0 flex-1 flex-row gap-2">
						<div className="flex min-w-0 flex-1 flex-col gap-1">
							<label
								htmlFor="unit"
								className="text-sm font-bold uppercase"
							>
								Unit
							</label>
							<Inputbox
								name="unit"
								id="unit"
								value={selectedProductPrice.unit}
								disabled
								readOnly
							/>
						</div>
						<div className="flex min-w-0 flex-1 flex-col gap-1">
							<label
								htmlFor="quantity"
								className="text-sm font-bold uppercase"
							>
								Quantity
							</label>
							<Inputbox
								name="quantity"
								id="quantity"
								value={selectedProductPrice.quantity}
								disabled
								readOnly
							/>
						</div>
					</div>
				</div>
				<hr className="mt-2 h-px w-full border-0 bg-gray-200 " />
				<div className="flex min-w-0 flex-1 flex-row gap-2">
					<div className="relative flex min-w-0 flex-1 flex-col gap-1">
						<label
							htmlFor="capital_price"
							className="text-sm font-bold uppercase"
						>
							Capital Price
						</label>
						<Inputbox
							name="capital_price"
							id="capital_price"
							value={
								selectedProductPrice.capital_price &&
								selectedProductPrice.capital_price.toFixed(2)
							}
							className="pl-8"
							disabled
							readOnly
						/>
						<span className="absolute bottom-0 left-0 pb-[0.55rem] pl-3 font-semibold text-gray-400">
							₱
						</span>
					</div>
					<div className="relative flex min-w-0 flex-1 flex-col gap-1">
						<label
							htmlFor="markup_price"
							className="text-sm font-bold uppercase"
						>
							Markup
						</label>
						<Inputbox
							name="markup_price"
							id="markup_price"
							value={selectedProductPrice.markup_price}
							disabled
							readOnly
						/>
						<span className="absolute bottom-0 right-0 pb-[0.55rem] pr-3 font-semibold text-gray-400">
							%
						</span>
					</div>
					<div className="relative flex min-w-0 flex-1 flex-col gap-1">
						<label
							htmlFor="retail_price"
							className="text-sm font-bold uppercase"
						>
							Retail Price
						</label>
						<Inputbox
							name="retail_price"
							id="retail_price"
							value={
								selectedProductPrice.retail_price &&
								selectedProductPrice.retail_price.toFixed(2)
							}
							className="pl-8"
							disabled
							readOnly
						/>
						<span className="absolute bottom-0 left-0 pb-[0.55rem] pl-3 font-semibold text-gray-400">
							₱
						</span>
					</div>
				</div>
				<div className="flex flex-row gap-5">
					<div className="flex min-w-0 flex-1 flex-row gap-2">
						<div className="relative flex min-w-0 flex-1 flex-col gap-1">
							<label
								htmlFor="sale_price"
								className="text-sm font-bold uppercase"
							>
								Sale Price
							</label>
							<Inputbox
								name="sale_price"
								id="sale_price"
								value={
									selectedProductPrice.sale_price &&
									selectedProductPrice.sale_price.toFixed(2)
								}
								disabled
								readOnly
							/>
							<div className="absolute bottom-0 right-0 flex flex-none flex-row items-center justify-start gap-2 pb-[0.67rem] pr-3">
								<Inputbox
									name="on_sale"
									id="on_sale"
									type="checkbox"
									value="On Sale"
									disabled
									readOnly
									checked={selectedProductPrice.on_sale ? true : false}
								/>
								<label
									htmlFor="on_sale"
									className="text-sm font-semibold text-gray-700"
								>
									On Sale
								</label>
							</div>
						</div>
					</div>
					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<label
							htmlFor="warehouse"
							className="text-sm font-bold uppercase"
						>
							Warehouse
						</label>
						<Inputbox
							name="warehouse"
							id="warehouse"
							value={selectedProductPrice.warehouse.name}
							disabled
							readOnly
						/>
					</div>
				</div>
				<hr className="mt-2 h-px w-full border-0 bg-gray-200 " />
				<div className="flex min-w-0 flex-1 flex-row gap-2">
					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<label
							htmlFor="created_by"
							className="text-sm font-bold uppercase"
						>
							Created by
						</label>
						<Inputbox
							name="created_by"
							id="created_by"
							value={
								selectedProductPrice.created_by.firstname +
								' ' +
								selectedProductPrice.created_by.lastname
							}
							disabled
							readOnly
						/>
					</div>
					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<label
							htmlFor="approval_status"
							className="text-sm font-bold uppercase"
						>
							Approval Status
						</label>
						<Inputbox
							name="approval_status"
							id="approval_status"
							value={
								selectedProductPrice.approval_status === 'approved'
									? 'Approved'
									: selectedProductPrice.approval_status === 'rejected'
										? 'Rejected'
										: 'Pending'
							}
							disabled
							readOnly
						/>
					</div>
					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<label
							htmlFor="approved_by"
							className="text-sm font-bold uppercase"
						>
							Approved by
						</label>
						<Inputbox
							name="approved_by"
							id="approved_by"
							value={
								selectedProductPrice.approved_by
									? selectedProductPrice.approved_by.firstname +
										' ' +
										selectedProductPrice.approved_by.lastname
									: ''
							}
							disabled
							readOnly
						/>
					</div>
				</div>
				<div className="flex min-w-0 flex-1 flex-row gap-2">
					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<label
							htmlFor="active_status"
							className="text-sm font-bold uppercase"
						>
							Active Status
						</label>
						<Inputbox
							name="active_status"
							id="active_status"
							value={
								selectedProductPrice.active_status
									? selectedProductPrice.active_status === 'active'
										? 'Active'
										: 'Inactive'
									: 'Inactive'
							}
							disabled
							readOnly
						/>
					</div>
					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<label
							htmlFor="created_at"
							className="text-sm font-bold uppercase"
						>
							Created at
						</label>
						<Inputbox
							name="created_at"
							id="created_at"
							value={formatUTCDate(selectedProductPrice.created_at)}
							disabled
							readOnly
						/>
					</div>
					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<label
							htmlFor="updated_at"
							className="text-sm font-bold uppercase"
						>
							Update at
						</label>
						<Inputbox
							name="updated_at"
							id="updated_at"
							value={
								selectedProductPrice.updated_at.includes('-000001')
									? ''
									: formatUTCDate(selectedProductPrice.updated_at)
							}
							disabled
							readOnly
						/>
					</div>
				</div>
				<div className="flex min-w-0 flex-1 flex-row gap-2"></div>
			</div>
			<Button
				fill={'empty'}
				className="bg-gray-600 hover:bg-gray-800"
				onClick={onClose}
				type="reset"
			>
				Close
			</Button>
		</>
	);
};
