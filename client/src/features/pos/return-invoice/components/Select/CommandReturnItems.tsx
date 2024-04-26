import { CommandItem } from '@/components/ui/command';
import { useReturnInvoiceItemsPos } from '../../context';
import { formatCurrency } from '@/utils/FormatCurrency';

interface CommandReturnItemsProps {
  isOpen: (open: boolean) => void;
}

export const CommandReturnItems = ({ isOpen }: CommandReturnItemsProps) => {
  const { returnInvoiceItems, selectedReturnItems, setSelectedReturnItems } =
    useReturnInvoiceItemsPos();
  console.log('Return Invoice Items:', selectedReturnItems);
  return (
    <>
      {returnInvoiceItems.invoice_items.map((item, key) => (
        <CommandItem
          key={key}
          value={
            item.product.id +
            '_' +
            item.product.name +
            '_' +
            item.product.serial_no
          }
          className={`${selectedReturnItems.includes(item) ? 'hidden' : ''}`}
          onSelect={() => {
            setSelectedReturnItems([...selectedReturnItems, item]);
            isOpen(false);
          }}>
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              {item.product.brand && (
                <>
                  <span className="text-sm text-slate-500">
                    ({item.product.brand})
                  </span>
                  •
                </>
              )}
              <span className="text-base font-bold">{item.product.name}</span>•
              <span className="text-sm capitalize text-slate-500">
                {item.product.size}
              </span>
              •
              <span className="text-sm capitalize text-slate-700">
                {item.product.color}
              </span>
            </div>
            <div className="flex flex-row gap-3">
              {item.quantity > 1 ? (
                <span>{item.quantity} pcs</span>
              ) : (
                <span>{item.quantity} pc</span>
              )}
              <span className="font-bold">
                {formatCurrency(item.product_price)}
              </span>
            </div>
          </div>
        </CommandItem>
      ))}
    </>
  );
};
