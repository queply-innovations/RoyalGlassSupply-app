import { fetchInvoiceByCode } from '@/features/invoice/__test__/api';
import {
  InvoiceItems,
  ReturnInvoiceDatabase,
} from '@/features/invoice/__test__/types';
import { createContext, useContext, useEffect, useState } from 'react';

interface ReturnInvoiceItemsContextProps {
  returnInvoiceItems: ReturnInvoiceDatabase;
  invoiceCode: string;
  setInvoiceCode: React.Dispatch<React.SetStateAction<string>>;
  toastMessage: string | undefined;
  selectedReturnItems: InvoiceItems[];
  setSelectedReturnItems: React.Dispatch<React.SetStateAction<InvoiceItems[]>>;
  quantityHandler: (
    index: number,
    newQuantity: number,
    maxQuantity: number,
  ) => void;
}

interface ReturnInvoiceItemsPosProviderProps {
  children: React.ReactNode;
}

const ReturnInvoiceItemsContext = createContext<
  ReturnInvoiceItemsContextProps | undefined
>(undefined);

export const ReturnInvoiceItemsPosProvider = ({
  children,
}: ReturnInvoiceItemsPosProviderProps) => {
  const [invoiceCode, setInvoiceCode] = useState<string>('');

  const [returnInvoiceItems, setReturnInvoiceItems] =
    useState<ReturnInvoiceDatabase>({} as ReturnInvoiceDatabase);

  const [toastMessage, setToastMessage] = useState<string | undefined>(
    undefined,
  );
  const [selectedReturnItems, setSelectedReturnItems] = useState<
    InvoiceItems[]
  >([]);

  function quantityHandler(
    index: number,
    newQuantity: number,
    maxQuantity: number,
  ) {
    if (newQuantity >= maxQuantity) {
      setSelectedReturnItems(items => {
        return items.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        });
      });
    }
  }

  useEffect(() => {
    if (invoiceCode != '') {
      fetchInvoiceByCode(invoiceCode)
        .then(data => {
          setReturnInvoiceItems(data);
          setToastMessage(undefined);
        })
        .catch(error => {
          setToastMessage(error.message);
          setReturnInvoiceItems({} as ReturnInvoiceDatabase);
        });
    }
  }, [invoiceCode]);

  const value = {
    returnInvoiceItems,
    invoiceCode,
    setInvoiceCode,
    toastMessage,
    selectedReturnItems,
    setSelectedReturnItems,
    quantityHandler,
  };

  return (
    <ReturnInvoiceItemsContext.Provider value={value}>
      {children}
    </ReturnInvoiceItemsContext.Provider>
  );
};

export function useReturnInvoiceItemsPos() {
  const context = useContext(ReturnInvoiceItemsContext);

  if (!context) {
    throw new Error(
      'useReturnInvoiceItemsPos hook must be used within ReturnInvoiceItemsPosProvider',
    );
  }

  return context;
}
