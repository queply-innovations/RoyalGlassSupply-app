import { Label } from '@/components/ui/label';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const PaymentType = () => {
   const { currentInvoicePos } = useInvoicePos();
   return (
      <>
         <div className="flex w-full flex-row justify-between">
            <Label className="text-medium font-medium text-slate-700">
               Payment Type
            </Label>
            <Label className="font-bold capitalize text-slate-700">
               {currentInvoicePos.type?.replace('_', ' ')}
            </Label>
         </div>
         {currentInvoicePos.type !== 'exit' && (
            <>
               <div className="flex w-full flex-row justify-between">
                  <Label className="text-medium font-medium text-slate-700">
                     Payment Method
                  </Label>
                  <Label className="font-bold capitalize text-slate-700">
                     {currentInvoicePos.payment_method?.replace('_', ' ')}
                  </Label>
               </div>
               {currentInvoicePos.payment_method !== 'cash' &&
                  currentInvoicePos.payment_method !== '' && (
                     <>
                        <div className="flex w-full flex-row justify-between">
                           <Label className="text-medium font-medium text-slate-700">
                              Reference Number
                           </Label>
                           <Label className="font-bold capitalize text-slate-700">
                              {currentInvoicePos.reference_no}
                           </Label>
                        </div>
                     </>
                  )}
            </>
         )}
      </>
   );
};
