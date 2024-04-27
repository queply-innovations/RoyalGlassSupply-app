import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/FormatCurrency';
import { HandCoins } from 'lucide-react';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const ChangeAmount = () => {
   const { currentInvoicePos, currentInvoiceItemsQueue } = useInvoicePos();

   function getChange() {
      if (currentInvoicePos.paid_amount === 0) {
         return 0;
      } else {
         return (
            (currentInvoicePos.paid_amount ?? 0) -
            currentInvoiceItemsQueue.reduce(
               (acc, item) => acc + item.total_price,
               0,
            ) +
            (currentInvoicePos.total_discount ?? 0)
         );
      }
   }
   return (
      <>
         <Button
            variant="outline"
            className="justify-between hover:cursor-default hover:bg-white">
            <div className="flex flex-row items-center gap-2">
               <HandCoins />
               <span>Change</span>
            </div>
            <div>
               <span className="justify-between text-base">
                  {formatCurrency(Number(getChange()))}
               </span>
            </div>
         </Button>
      </>
   );
};
