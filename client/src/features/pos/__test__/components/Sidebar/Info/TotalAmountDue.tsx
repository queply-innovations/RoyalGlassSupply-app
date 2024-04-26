import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useEffect } from 'react';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const TotalAmountDue = () => {
   const {
      currentInvoiceItemsQueue,
      currentInvoicePos,
      handleInvoicePosChange,
   } = useInvoicePos();
   const totalAmountDue =
      currentInvoiceItemsQueue.reduce(
         (acc, item) => acc + item.total_price,
         0,
      ) - (currentInvoicePos.total_discount ?? 0);
   useEffect(() => {
      handleInvoicePosChange('total_amount_due', totalAmountDue);
   }, [totalAmountDue]);
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
