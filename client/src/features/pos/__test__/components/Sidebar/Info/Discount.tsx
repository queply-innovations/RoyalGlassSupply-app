import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const Discount = () => {
   const { currentInvoicePos } = useInvoicePos();

   return (
      <>
         <div className="flex w-full flex-row justify-between">
            <Label className="text-medium font-medium text-slate-700">
               Discount
            </Label>
            <Label className="font-bold text-slate-700">
               {currentInvoicePos.total_discount
                  ? formatCurrency(currentInvoicePos.total_discount)
                  : '₱0.00'}
            </Label>
         </div>
      </>
   );
};
