import { Button } from '@/components/ui/button';
import { InvoiceItemsTable } from '@/features/invoice/__test__/components/table/InvoiceItemsTable';
import { InvoiceProvider } from '@/features/invoice/__test__/context/InvoiceContext';
import {
   useInvoiceItemQueryById,
   useInvoiceQueryById,
} from '@/features/invoice/__test__/hooks/useInvoiceQuery';
import { ProductPricesProvider } from '@/features/product/__test__';
import { MainLayout } from '@/layouts/MainLayout';
import { formatCurrency } from '@/utils/FormatCurrency';
import { formatUTCMMDDYYYY } from '@/utils/timeUtils';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface InvoiceItemsProps {}

export const InvoiceItems = ({}: InvoiceItemsProps) => {
   const navigate = useNavigate();
   const { id: invoiceId } = useParams();

   const { data: invoice, isLoading: isInvoiceLoading } = useInvoiceQueryById(
      Number(invoiceId),
   );

   const { invoiceItems, isLoading: isItemsLoading } = useInvoiceItemQueryById(
      Number(invoiceId),
   );

   const handleNavigateBack = () => {
      navigate(-1);
   };

   return (
      <>
         <MainLayout title="Transaction Items">
            <div className="flex h-full max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
               <div className="text-primary-dark-gray flex flex-row items-center gap-6 text-sm font-medium">
                  <Button
                     onClick={() => handleNavigateBack()}
                     className="flex flex-row items-center gap-3 whitespace-nowrap bg-gray-200 pr-6 font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700">
                     <ChevronLeft size={22} strokeWidth={2.25} />
                     <span>Go back</span>
                  </Button>
                  <div className="flex flex-row gap-8">
                     <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                           <h2 className="font-bold">Inventory code:</h2>
                           <span>
                              {!isInvoiceLoading ? invoice?.code : 'Loading...'}
                           </span>
                        </div>

                        <div className="flex flex-row gap-2">
                           <h2 className="font-bold">Created at:</h2>
                           <span>
                              {!isInvoiceLoading
                                 ? formatUTCMMDDYYYY(invoice?.created_at)
                                 : 'Loading...'}
                           </span>
                        </div>
                     </div>
                     <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                           <h2 className="font-bold">Issued By:</h2>
                           <span>
                              {!isInvoiceLoading
                                 ? invoice?.issued_by.firstname +
                                   ' ' +
                                   invoice?.issued_by.lastname
                                 : 'Loading...'}
                           </span>
                        </div>

                        <div className="flex flex-row gap-2">
                           <h2 className="font-bold">Customer:</h2>
                           <span className="capitalize">
                              {!isInvoiceLoading
                                 ? invoice?.customer.firstname +
                                   ' ' +
                                   invoice?.customer.lastname
                                 : 'Loading...'}
                           </span>
                        </div>
                     </div>
                     <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                           <h2 className="font-bold">Total Amount Due:</h2>
                           <span>
                              {!isInvoiceLoading
                                 ? formatCurrency(invoice?.total_amount_due)
                                 : 'Loading...'}
                           </span>
                        </div>
                        <div className="flex flex-row gap-2">
                           <h2 className="font-bold">Warehouse:</h2>
                           <span>
                              {!isInvoiceLoading
                                 ? invoice?.warehouse.code
                                 : 'Loading...'}
                           </span>
                        </div>
                     </div>
                     <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                           <h2 className="font-bold">Balance Amount:</h2>
                           <span>
                              {!isInvoiceLoading
                                 ? formatCurrency(invoice?.balance_amount)
                                 : 'Loading...'}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               {/* //TODO Table here */}
               <div>
                  {!isItemsLoading && (
                     <>
                        <InvoiceItemsTable items={invoiceItems} />
                     </>
                  )}
               </div>
            </div>
         </MainLayout>
      </>
   );
};
