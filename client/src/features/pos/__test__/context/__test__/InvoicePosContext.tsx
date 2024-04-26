import { useAuth } from '@/context/AuthContext';
import {
   InvoiceItemDatabase,
   Invoices,
} from '@/features/invoice/__test__/types';
import { ReactNode, createContext, useContext, useState } from 'react';

interface InvoicePosContextProps {
   currentInvoicePos: Partial<Invoices>;
   setCurrentInvoicePos: React.Dispatch<Partial<Invoices>>;

   currentInvoiceItemsQueue: InvoiceItemDatabase[];
   setCurrentInvoiceItemsQueue: React.Dispatch<InvoiceItemDatabase[]>;

   handleInvoicePosChange: (
      key: string,
      value: Invoices[keyof Invoices],
   ) => void;
   handleInvoiceItemQuantiy: (
      tableIndex: number,
      maxQuantity: number,
      newQuantity: number,
   ) => void;
   removeInvoiceItem: (tableIndex: number) => void;

   fullData: any;
   setFullData: React.Dispatch<any>;
}

const InvoicePosContext = createContext<InvoicePosContextProps | undefined>(
   undefined,
);

interface InvoiceProviderProps {
   children: ReactNode;
}
export const InvoicePosProvider = ({ children }: InvoiceProviderProps) => {
   const { auth } = useAuth();

   const [currentInvoicePos, setCurrentInvoicePos] = useState<
      Partial<Invoices>
   >({
      issued_by: auth.user.id,
      total_amount_due: 0,
      change_amount: 0,
      subtotal: 0,
      type: 'payment',
      payment_method: '',
      reference_no: '',
      paid_amount: 0,
      total_discount: 0,
      status: 'approved',
   } as Invoices);

   const [currentInvoiceItemsQueue, setCurrentInvoiceItemsQueue] = useState<
      InvoiceItemDatabase[]
   >([]);

   function addInvoiceItems() {}

   function handleInvoicePosChange(
      key: string,
      value: Invoices[keyof Invoices],
   ) {
      setCurrentInvoicePos(prev => ({
         ...prev,
         [key]: value,
      }));
   }

   function handleInvoiceItemQuantiy(
      tableIndex: number,
      maxQuantity: number,
      newQuantity: number,
   ) {
      if (newQuantity > 0 && newQuantity <= maxQuantity) {
         setCurrentInvoiceItemsQueue(items =>
            items.map((item, index) => {
               if (index === tableIndex) {
                  return {
                     ...item,
                     quantity: newQuantity,
                     total_price:
                        Number(
                           Number(item.product_price * newQuantity).toFixed(2),
                        ) - item.item_discount,
                  };
               }
               return item;
            }),
         );
         handleInvoicePosChange(
            'total_amount_due',
            currentInvoiceItemsQueue.reduce(
               (acc, item) => acc + item.total_price,
               0,
            ),
         );
      }
   }

   function removeInvoiceItem(tableIndex: number) {
      setCurrentInvoiceItemsQueue(prev =>
         prev.filter((_, index) => index !== tableIndex),
      );
   }

   // TODO - eyb print invoice
   const [fullData, setFullData] = useState<any>();

   const value = {
      currentInvoicePos,
      setCurrentInvoicePos,

      currentInvoiceItemsQueue,
      setCurrentInvoiceItemsQueue,

      handleInvoiceItemQuantiy,
      handleInvoicePosChange,
      removeInvoiceItem,

      fullData,
      setFullData,
   };
   return (
      <>
         <InvoicePosContext.Provider value={value}>
            {children}
         </InvoicePosContext.Provider>
      </>
   );
};

export const useInvoicePos = () => {
   const context = useContext(InvoicePosContext);

   if (!context) {
      throw new Error('useInvoice must be used within InvoiceContext');
   }
   return context;
};
