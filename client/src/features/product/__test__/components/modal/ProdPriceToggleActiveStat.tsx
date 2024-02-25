import { UseModalProps } from '@/utils/Modal';
import { useProductPrices } from '../..';
import { Button, Inputbox } from '@/components';

interface ProdPriceToggleActiveStatProps {
	onClose: UseModalProps['closeModal'];
}

export const ProdPriceToggleActiveStat = ({
	onClose,
}: ProdPriceToggleActiveStatProps) => {
	const { selectedProductPrice } = useProductPrices();

	return (
		<>
			<div className="flex max-w-md flex-col gap-5">
				<p>
					Are you sure you would like to set this listing to{' '}
					<strong>
						{selectedProductPrice.active_status === 'active'
							? 'inactive'
							: 'active'}
					</strong>
					?
				</p>
				<div className="flex flex-row gap-5">
					<div className="flex min-w-0 flex-1 flex-row gap-2">
						<div className="flex min-w-0 flex-1 flex-col gap-1">
							<label
								htmlFor="name"
								className="text-sm font-bold uppercase"
							>
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
				</div>
				<div className="flex min-w-0 flex-1 flex-row gap-2">
					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<label htmlFor="type" className="text-sm font-bold uppercase">
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
						<label htmlFor="unit" className="text-sm font-bold uppercase">
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
				<div className="flex min-w-0 flex-1 flex-row gap-2">
					<Button
						fill={'empty'}
						className="flex-1 bg-gray-500 hover:bg-gray-700"
						onClick={onClose}
						type="reset"
					>
						Cancel
					</Button>
					<Button
						fill={'empty'}
						className="flex-1 bg-green-600 hover:bg-green-800"
						onClick={onClose}
						type="reset"
					>
						Proceed
					</Button>
				</div>
			</div>
		</>
	);
};
