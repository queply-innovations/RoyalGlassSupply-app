import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/FormatCurrency';
import { PaidAmount } from './PaidAmount';
import { PaymentType } from './PaymentType';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const ChangeAmount = () => {
   const { invoiceItemsDatabase, currentInvoicePos } = useInvoicePos();
   function getChange() {
      if (currentInvoicePos.paid_amount === 0) {
         return 0;
      } else {
         return (
            (currentInvoicePos.paid_amount ?? 0) -
            invoiceItemsDatabase.reduce(
               (acc, item) => acc + item.total_price,
               0,
            ) +
            (currentInvoicePos.total_discount ?? 0)
         );
      }
   }
   return (
      <>
         <div className="flex w-full flex-col justify-between gap-2 border-t border-dashed py-2">
            <PaymentType />
            <PaidAmount />

            <div className="flex flex-row justify-between">
               <Label className="text-xl font-bold text-gray-700">Change</Label>
               <Label className="text-xl font-bold text-black">
                  {formatCurrency(Number(getChange()))}
               </Label>
            </div>
         </div>
      </>
   );
};
