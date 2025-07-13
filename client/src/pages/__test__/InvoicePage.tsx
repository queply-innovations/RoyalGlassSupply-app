import { ModalTest } from '@/components/__test__/Modal/Modal';
import { InvoiceForm } from '@/features/invoice/__test__/components/InvoiceForm';
import { InvoiceTable } from '@/features/invoice/__test__/components/InvoiceTable';
import { InvoiceProvider } from '@/features/invoice/__test__/context/InvoiceContext';
import { Invoices } from '@/features/invoice/__test__/types';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { getDateNow } from '@/utils/timeUtils';
import { useState } from 'react';
import { ProductPricesProvider } from '@/features/product/__test__';
import { InvoicesTable } from '@/features/invoice/__test__/components/table/InvoicesTable';

interface InvoiceProps {}

export const Invoice = ({}: InvoiceProps) => {
   const { isOpen, openModal, closeModal } = useModal();
   const [modalAction, setModalAction] = useState<string>('');

   const modalHandler = (data: Invoices, action: string) => {
      openModal();
      setModalAction(action);
      console.log('modalAction:', modalAction);
   };
   return (
      <>
         <MainLayout title="Transactions">
            <ProductPricesProvider>
               <InvoiceProvider>
                  <div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
                     <div className="max-h-full w-full flex-1 rounded-md border border-black/10">
                        <InvoicesTable openModal={modalHandler} />
                     </div>
                  </div>
               </InvoiceProvider>
            </ProductPricesProvider>
         </MainLayout>
      </>
   );
};
