import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const TotalAmountDue = () => {
   const { currentInvoicePos } = useInvoicePos();
   const totalAmountDue = currentInvoicePos.total_amount_due;

   return (
      <>
         <div className="flex w-full flex-col justify-between gap-2 border-t border-dashed py-2">
            <div className="flex flex-row justify-between">
               <Label className="text-xl font-bold text-gray-700">Total</Label>
               <Label className="text-xl font-bold text-black">
                  {totalAmountDue ? formatCurrency(totalAmountDue) : '₱0.00'}
               </Label>
            </div>
         </div>
      </>
   );
};
