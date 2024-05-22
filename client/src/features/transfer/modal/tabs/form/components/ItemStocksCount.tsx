import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useNewTransfer } from '@/features/transfer/context/NewTransferContext';
import { TransferProduct } from '@/features/transfer/types';

interface ItemStocksCountProps {
	selectedProduct: Omit<TransferProduct, 'transfer_id'> & {
		product_name: string;
	};
	setSelectedProduct: React.Dispatch<
		React.SetStateAction<
			Omit<TransferProduct, 'transfer_id'> & {
				product_name: string;
			}
		>
	>;
}

export const ItemStocksCount = ({
	selectedProduct,
	setSelectedProduct,
}: ItemStocksCountProps) => {
	const { newTransfer } = useNewTransfer();

	return (
		<>
			<div className="relative flex w-1/2 flex-col justify-center gap-1">
				<Label
					htmlFor="stocks_count"
					className="text-sm font-bold text-gray-600"
				>
					Stocks Count
				</Label>
				<Input
					id="stocks_count"
					name="stocks_count"
					type="number"
					min={0}
					max={9999999}
					step={1}
					value={selectedProduct?.total_quantity || 0}
					required
					onChange={event => {
						setSelectedProduct((previous: any) => {
							return { ...previous, total_quantity: event.target.value };
						});
					}}
				/>
				<span className="absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500"></span>
			</div>
		</>
	);
};
