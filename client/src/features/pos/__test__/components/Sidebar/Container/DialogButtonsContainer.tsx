/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { usePos } from '../../../context/__test__/PosContext';
import { useInvoiceMutation } from '@/features/invoice/__test__/hooks/useInvoiceMutation';
import { useEffect } from 'react';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

interface DialogButtonsContainerProps {}

export const DialogButtonsContainer = ({}: DialogButtonsContainerProps) => {
   const { setDialogOptions } = usePos();
   const {
      currentInvoicePos,
      currentInvoiceItemsQueue,
      fullData,
      setFullData,
   } = useInvoicePos();
   // const { invoice, invoiceItemsQueue, fullData, setFullData } = useInvoice();
   const { addInvoiceMutation } = useInvoiceMutation();

   async function handleSubmit() {
      console.log('Invoice:', currentInvoicePos);
      console.log('InvoiceItems:', currentInvoiceItemsQueue);
      const data: any = currentInvoicePos;
      data['invoice_items'] = currentInvoiceItemsQueue.map((d: any) => {
         return { ...d, product_id: d.product_id.id };
      });
      // await addInvoiceMutation(data).then(() => window.api.send());
      await addInvoiceMutation(data).then(res => {
         setFullData(res.data);
      });
   }

   // TODO: Check this print function
   useEffect(() => {
      if (fullData) {
         console.log(fullData);
         window.api.send({
            fullData: fullData,
            invoiceItems: currentInvoiceItemsQueue,
         });
      }
   }, [fullData]);

   return (
      <>
         <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
               <Button
                  onClick={() => {
                     setDialogOptions({ open: true, title: 'discount' });
                  }}>
                  Add Discount
               </Button>
               <Button
                  variant={'outline'}
                  className="hover:cursor-not-allowed hover:bg-white"
                  onClick={() => {
                     setDialogOptions({
                        open: true,
                        title: 'delivery_charge',
                     });
                  }}>
                  Delivery Charge
               </Button>
            </div>
            <Button
               onClick={() => {
                  setDialogOptions({ open: true, title: 'payment_type' });
               }}>
               Select Payment Type
            </Button>
            <Button
               onClick={() => {
                  setDialogOptions({ open: true, title: 'paid_amount' });
               }}>
               Add Paid Amount
            </Button>
            <Button
               variant={'outline'}
               className="w-full"
               onClick={() => {
                  handleSubmit();
               }}>
               Submit
            </Button>
         </div>
      </>
   );
};
