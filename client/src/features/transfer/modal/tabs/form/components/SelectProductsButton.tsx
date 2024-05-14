import { useNewTransfer } from '@/features/transfer/context/NewTransferContext';
import { PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Loader2 } from 'lucide-react';

interface SelectProductsButtonProps {}

export const SelectProductsButton = ({}: SelectProductsButtonProps) => {
  const { inventoryProducts, inventoryProductsLoading } = useNewTransfer();
  return (
    <>
      {inventoryProductsLoading ? (
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            className={`w-full justify-between text-sm font-bold text-slate-700 disabled:cursor-not-allowed`}
            variant={'outline'}
            disabled>
            <Loader2 className="h-4 w-4 animate-spin" />
          </Button>
        </PopoverTrigger>
      ) : (
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            className={`w-full justify-between text-sm font-bold text-slate-700 disabled:cursor-not-allowed`}
            variant={'outline'}
            disabled={inventoryProducts.length === 0}>
            {inventoryProducts.length > 0 ? 'Select product...' : 'No products'}
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
