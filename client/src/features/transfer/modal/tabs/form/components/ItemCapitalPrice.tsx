import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useNewTransfer } from '@/features/transfer/context/NewTransferContext';
import { TransferProduct } from '@/features/transfer/types';

interface ItemCapitalPriceProps {
	selectedProduct: Omit<TransferProduct, 'transfer_id'>;
	setSelectedProduct: React.Dispatch<
		React.SetStateAction<Omit<TransferProduct, 'transfer_id'>>
	>;
}

export const ItemCapitalPrice = ({
	selectedProduct,
	setSelectedProduct,
}: ItemCapitalPriceProps) => {
	const { newTransfer } = useNewTransfer();
	return (
		<>
			<div className="relative flex w-1/2 flex-col justify-center gap-1">
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
					required
					className="pl-8"
					placeholder={'0.00'}
					value={selectedProduct?.capital_price || 0}
					onBlur={() => {}}
					onChange={event => {
						setSelectedProduct((previous: any) => {
							return { ...previous, capital_price: event.target.value };
						});
					}}
				/>
				<span className="absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500">
					₱
				</span>
			</div>
		</>
	);
};
