import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNewTransfer } from '@/features/transfer/context/NewTransferContext';
import { useState } from 'react';
import { SelectProductsButton } from './SelectProductsButton';

export const SelectProducts = () => {
  const { inventoryProducts, handleChange, newTransfer } = useNewTransfer();
  const [productsListOpen, setProductsListOpen] = useState(false);

  console.log(inventoryProducts);
  console.log(newTransfer);
  return (
    <>
      <div className="flex flex-col justify-center gap-1">
        <Label htmlFor="product_id" className="text-sm font-bold text-gray-600">
          Product
        </Label>
        <Popover open={productsListOpen} onOpenChange={setProductsListOpen}>
          <SelectProductsButton />
          <PopoverContent className="min-w-[53rem] p-0 text-sm font-medium text-slate-700">
            <Command>
              <CommandInput placeholder="Product name or serial number..." />
              <CommandEmpty>No match found</CommandEmpty>
              <ScrollArea className="max-h-[200px] overflow-y-scroll">
                <CommandGroup>
                  {inventoryProducts.map((product, key) => (
                    <CommandItem
                      key={key}
                      className="cursor-pointer justify-between rounded-sm border-b"
                      value={
                        product.product.id.toString() +
                        '_' +
                        product.product.name +
                        '_' +
                        product.product.brand
                      }
                      onSelect={() => {
                        handleChange('transferItems', [
                          ...newTransfer.transferItems,
                          {
                            product_id: product.product.id,
                            unit: product.unit,
                            source_inventory: product.inventory_id,
                            total_quantity: 1,
                            capital_price: product.capital_price,
                          },
                        ]);
                        setProductsListOpen(false);
                      }}>
                      {`${product.product.name} • ${product.product.brand} • ${product.product.size} • ${product.product.color}`}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
