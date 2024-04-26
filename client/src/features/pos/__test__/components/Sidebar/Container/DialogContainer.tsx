import { usePos } from '../../../context/__test__/PosContext';
import { AddDiscountDialog, AddPaidAmount, PaymentTypeDialog } from '../Dialog';

export const DialogContainer = () => {
   const { dialogOptions } = usePos();
   return (
      <>
         {dialogOptions.title === 'payment_type' && <PaymentTypeDialog />}
         {dialogOptions.title === 'discount' && <AddDiscountDialog />}
         {dialogOptions.title === 'paid_amount' && <AddPaidAmount />}
      </>
   );
};
