import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { usePos } from '../../../context/__test__/PosContext';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
interface AddPaidAmountProps {
   // value: boolean;
}

export const AddPaidAmount = ({}: AddPaidAmountProps) => {
   const { setDialogOptions, dialogOptions } = usePos();
   const { handleInvoicePosChange, currentInvoicePos } = useInvoicePos();

   const [PaidAmount, setPaidAmount] = useState<number>(
      currentInvoicePos.paid_amount ?? 0,
   );

   const submitHandler = () => {
      handleInvoicePosChange('paid_amount', PaidAmount);
      setDialogOptions({ open: false, title: '' });
   };

   return (
      <Dialog
         onOpenChange={() => {
            setDialogOptions({ open: false, title: '' });
         }}
         open={dialogOptions.open}>
         <DialogContent>
            <DialogHeader className="items-start">
               <DialogTitle>Add Paid Amount</DialogTitle>
               <DialogDescription>
                  Input the exact amount paid by the customer
               </DialogDescription>
            </DialogHeader>
            <form
               className="flex flex-col gap-2"
               onSubmit={e => {
                  e.preventDefault();
               }}>
               <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-black">
                     ₱
                  </span>
                  <Input
                     className="pl-8"
                     defaultValue={PaidAmount}
                     type="number"
                     onChange={e => {
                        setPaidAmount(Number(e.target.value));
                     }}
                  />
               </div>

               <DialogClose asChild>
                  <Button
                     className="w-full "
                     type="submit"
                     onClick={() => {
                        submitHandler();
                     }}>
                     Apply
                  </Button>
               </DialogClose>
            </form>
         </DialogContent>
      </Dialog>
   );
};
