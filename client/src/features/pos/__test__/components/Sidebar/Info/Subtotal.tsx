import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const Subtotal = () => {
   const { invoiceItemsDatabase } = useInvoicePos();

   return (
      <>
         <div className="flex w-full flex-row justify-between">
            <Label className="text-medium font-medium text-slate-700">
               Subtotal
            </Label>
            <Label className="font-bold text-slate-700">
               {formatCurrency(
                  invoiceItemsDatabase.reduce(
                     (acc, item) => acc + (item.total_price ?? 0),
                     0,
                  ),
               )}
            </Label>
         </div>
      </>
   );
};
