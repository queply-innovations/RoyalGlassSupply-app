import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const DeliveryCharge = () => {
   const { currentInvoicePos } = useInvoicePos();

   return (
      <>
         <div className="flex w-full flex-row justify-between">
            <Label className="text-medium font-medium text-slate-700">
               Delivery Charge
            </Label>
            <Label className="font-bold text-slate-700">
               {currentInvoicePos.delivery_charge
                  ? formatCurrency(currentInvoicePos.delivery_charge)
                  : '₱0.00'}
            </Label>
         </div>
      </>
   );
};
