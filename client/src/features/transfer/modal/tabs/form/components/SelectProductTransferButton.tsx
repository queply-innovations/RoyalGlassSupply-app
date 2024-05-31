import { useProductAddition } from '@/features/transfer/hooks';
import { PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { TransferProduct } from '@/features/transfer/types';
import { useEffect } from 'react';

interface SelectProductsButtonProps {
	selectedProduct: Omit<TransferProduct, 'transfer_id'> & {
		product_name: string;
	};
	products: any[];
}

export const SelectProductsTransferButton = ({
	selectedProduct,
	products,
}: SelectProductsButtonProps) => {
	const { isInventoryLoading } = useProductAddition();

	return (
		<>
			{isInventoryLoading ? (
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
						disabled={products.length === 0}
					>
						{products.length > 0 || !isInventoryLoading
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
