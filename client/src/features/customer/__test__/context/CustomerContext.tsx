import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Customer } from '../types';
import { useCustomerQueryFullname } from '../hooks/useCustomerQuery';
import { useInvoicePos } from '@/features/pos/__test__/context/__test__/InvoicePosContext';

interface CustomerContextProps {
  data: Customer[];
  isLoading: boolean;
  selectedCustomer: Customer;
  setSelectedCustomer: (customer: Customer) => void;
  openSearchCustomer: boolean;
  setOpenSearchCustomer: (open: boolean) => void;
  setSearchFullName: React.Dispatch<React.SetStateAction<string>>;
}

interface CustomerProviderProps {
  children: ReactNode;
}

const CustomerContext = createContext<CustomerContextProps | undefined>(
  undefined,
);

export const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [searchFullName, setSearchFullName] = useState('');
  const { data, isLoading } = useCustomerQueryFullname(searchFullName);

  const { currentInvoicePos, setCurrentInvoicePos } = useInvoicePos();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
    {} as Customer,
  );
  useEffect(() => {
    if (Object.keys(selectedCustomer).length !== 0) {
      setCurrentInvoicePos({
        ...currentInvoicePos,
        customer_id: selectedCustomer.id,
      });
    }
  }, [selectedCustomer]);
  const [openSearchCustomer, setOpenSearchCustomer] = useState(false);

  const value = {
    data,
    isLoading,
    selectedCustomer,
    setSelectedCustomer,
    openSearchCustomer,
    setOpenSearchCustomer,
    setSearchFullName,
  };
  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('usePos must be used within a PosProvider');
  }
  return context;
};
