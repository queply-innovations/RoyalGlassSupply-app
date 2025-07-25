import { useNewTransfer } from '@/features/transfer/context/NewTransferContext';
import { PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { TransferProduct } from '@/features/transfer/types';

interface SelectProductsButtonProps {
	selectedProduct: Omit<TransferProduct, 'transfer_id'> & {
		product_name: string;
	};
}

export const SelectProductsButton = ({
	selectedProduct,
}: SelectProductsButtonProps) => {
	const { inventoryProducts, inventoryProductsLoading } = useNewTransfer();

	return (
		<>
			{inventoryProductsLoading ? (
				<PopoverTrigger asChild>
					<Button
						role="combobox"
						className={`w-full justify-between text-sm font-bold text-slate-700 disabled:cursor-not-allowed`}
						variant={'outline'}
						disabled
					>
						<Loader2 className="h-4 w-4 animate-spin" />
					</Button>
				</PopoverTrigger>
			) : (
				<PopoverTrigger asChild>
					<Button
						role="combobox"
						className={`w-full justify-between text-sm font-bold text-slate-700 disabled:cursor-not-allowed`}
						variant={'outline'}
						disabled={inventoryProducts.source.length === 0}
					>
						{inventoryProducts.source.length > 0
							? selectedProduct
								? selectedProduct.product_name
								: 'Select product...'
							: 'No products'}
						<ChevronsUpDown
							size={14}
							strokeWidth={2}
							className="h-4 w-4 opacity-70"
						/>
					</Button>
				</PopoverTrigger>
			)}
		</>
	);
};
