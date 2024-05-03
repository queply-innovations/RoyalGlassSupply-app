import { useAuth } from '@/context/AuthContext';
import {
  InvoiceItemDatabase,
  InvoiceItems,
  Invoices,
} from '@/features/invoice/__test__/types';
import { ProductPrices } from '@/features/product/__test__/types';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface InvoicePosContextProps {
  currentInvoicePos: Partial<Invoices>;
  setCurrentInvoicePos: React.Dispatch<Partial<Invoices>>;

  currentInvoiceItemsQueue: ProductPrices[];
  setCurrentInvoiceItemsQueue: React.Dispatch<
    React.SetStateAction<Partial<Invoices>>
  >;

  invoiceItemsDatabase: InvoiceItemDatabase[];
  setInvoiceItemsDatabase: React.Dispatch<InvoiceItemDatabase[]>;

  addInvoiceItems: (
    tableIndex: number,
    item: Partial<InvoiceItemDatabase>,
  ) => void;

  handleInvoicePosChange: (
    key: string,
    value: Invoices[keyof Invoices],
  ) => void;
  handleInvoiceItemQuantity: (
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

  const [currentInvoicePos, setCurrentInvoicePos] = useState<Partial<Invoices>>(
    {
      issued_by: auth.user.id,
      total_amount_due: 0,
      change_amount: 0,
      subtotal: 0,
      type: 'payment',
      payment_method: 'cash',
      reference_no: '',
      paid_amount: 0,
      total_discount: 0,
      status: 'approved',
    } as Invoices,
  );

  const [currentInvoiceItemsQueue, setCurrentInvoiceItemsQueue] = useState<
    Partial<InvoiceItems>[]
  >([]);

  const [invoiceItemsDatabase, setInvoiceItemsDatabase] = useState<
    InvoiceItemDatabase[]
  >([]);

  const invoiceSubtotal = useMemo(() => {
    return invoiceItemsDatabase.reduce(
      (acc, currentItem) => acc + (currentItem.total_price ?? 0),
      0,
    );
  }, [invoiceItemsDatabase]);

  useEffect(() => {
    setCurrentInvoicePos(prev => ({
      ...prev,
      subtotal: invoiceSubtotal,
      total_amount_due:
        invoiceSubtotal -
        (prev.total_discount ?? 0) +
        (prev.delivery_charge ?? 0) +
        (prev.total_tax ?? 0),
    }));
    // if (currentInvoicePos.payment_method !== 'purchase_order') {
    //   if (
    //     currentInvoicePos.total_amount_due ??
    //     0 > (currentInvoicePos.paid_amount ?? 0)
    //   ) {
    //     setCurrentInvoicePos(prev => ({
    //       ...prev,
    //       payment_method: 'purchase_order',
    //       balance_amount:
    //         currentInvoicePos.total_amount_due ??
    //         0 - (currentInvoicePos.paid_amount ?? 0),
    //     }));
    //   }
    // }
  }, [
    invoiceSubtotal,
    currentInvoicePos.paid_amount,
    currentInvoicePos.total_discount,
    currentInvoicePos.delivery_charge,
    currentInvoicePos.total_tax,
  ]);

  function addInvoiceItems(
    tableIndex: number,
    item: Partial<InvoiceItemDatabase>,
  ) {
    if (tableIndex !== -1) {
      const updatedInvoiceItemsQueue = [...currentInvoiceItemsQueue];
      updatedInvoiceItemsQueue[tableIndex].quantity++;
      setCurrentInvoiceItemsQueue(updatedInvoiceItemsQueue);
      handleInvoicePosChange(
        'total_amount_due',
        currentInvoiceItemsQueue.reduce(
          (acc, item) => acc + (item.total_price ?? 0),
          0,
        ),
      );
    } else {
      setCurrentInvoiceItemsQueue([
        ...currentInvoiceItemsQueue,
        {
          product: {
            id: item.product?.id,
            name: item.product?.name,
            serial_no: item.product?.serial_no,
            brand: item.product?.brand,
            size: item.product?.size,
            color: item.product?.color,
          },
          product_price_id: item.product_price_id,
          product_price: item.product_price,
          quantity: item.quantity,
          unit: item.unit,
          item_discount: item.item_discount,
          discount_approval_status: item.discount_approval_status,
          approved_by: item.approved_by,
          total_price: item.total_price,
          source_inventory: item.source_inventory,
        },
      ]);
      handleInvoicePosChange(
        'total_amount_due',
        currentInvoiceItemsQueue.reduce(
          (acc, item) => acc + (item.total_price ?? 0),
          0,
        ),
      );
    }
  }

  function handleInvoicePosChange(
    key: string,
    value: Invoices[keyof Invoices],
  ) {
    setCurrentInvoicePos(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleInvoiceItemQuantity(
    tableIndex: number,
    maxQuantity: number,
    newQuantity: number,
  ) {
    // setCurrentInvoiceItemsQueue(items =>
    //    items.map((item, index) => {
    //       if (index === tableIndex) {
    //          return {
    //             ...item,
    //             quantity: newQuantity,
    //             total_price:
    //                Number(
    //                   Number(item.product_price * newQuantity).toFixed(2),
    //                ) - item.item_discount,
    //          };
    //       }
    //       return item;
    //    }),
    // );
    // handleInvoicePosChange(
    //    'total_amount_due',
    //    currentInvoiceItemsQueue.reduce(
    //       (acc, item) => acc + (item.total_price ?? 0),
    //       0,
    //    ),
    // );

    if (newQuantity > 0 && newQuantity <= maxQuantity) {
      setInvoiceItemsDatabase(prev =>
        prev.map((item, index) => {
          if (index === tableIndex) {
            return {
              ...item,
              quantity: newQuantity,
              total_price:
                Number(Number(item.product_price * newQuantity).toFixed(2)) -
                item.item_discount,
            };
          }
          return item;
        }),
      );
      handleInvoicePosChange(
        'total_amount_due',
        invoiceItemsDatabase.reduce(
          (acc, item) => acc + (item.total_price ?? 0),
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

    invoiceItemsDatabase,
    setInvoiceItemsDatabase,

    addInvoiceItems,
    handleInvoiceItemQuantity,
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
