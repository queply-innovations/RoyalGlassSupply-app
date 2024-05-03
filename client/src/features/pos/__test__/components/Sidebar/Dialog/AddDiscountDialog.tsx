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
interface AddDiscountDialogProps {
   // value: boolean;
}

export const AddDiscountDialog = ({}: AddDiscountDialogProps) => {
   const { setDialogOptions, dialogOptions } = usePos();
   const { handleInvoicePosChange, currentInvoicePos } = useInvoicePos();

   const [DiscountAmount, setDiscountAmount] = useState<number>(
      currentInvoicePos.total_discount ?? 0,
   );

   const submitHandler = () => {
      handleInvoicePosChange('total_discount', DiscountAmount);
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
               <DialogTitle>Add Discount Amount</DialogTitle>
               <DialogDescription>
                  Contact admininstrator for approval
               </DialogDescription>
            </DialogHeader>
            <form
               className="flex flex-col gap-2 "
               onSubmit={e => {
                  e.preventDefault();
               }}>
               <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-black">
                     ₱
                  </span>
                  <Input
                     className="pl-8"
                     defaultValue={DiscountAmount}
                     type="number"
                     onChange={e => {
                        setDiscountAmount(Number(e.target.value));
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
