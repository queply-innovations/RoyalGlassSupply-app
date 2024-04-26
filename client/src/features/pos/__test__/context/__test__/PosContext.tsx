import { useAuth } from '@/context/AuthContext';
import { InvoiceItems } from '@/features/invoice/__test__/types';
import {
   ProductPricesFilterProps,
   useProductPricesFilter,
} from '@/features/product/__test__/hooks';
import { ProductPrices } from '@/features/product/__test__/types';
import {
   ReactNode,
   createContext,
   useContext,
   useEffect,
   useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface PosContextProps {
   searchFilterItems: ProductPricesFilterProps;
   setSearchFilterItems: React.Dispatch<
      React.SetStateAction<ProductPricesFilterProps>
   >;

   sellableItems: ProductPrices[];

   customerCart: InvoiceItems[];
   setCustomerCart: React.Dispatch<React.SetStateAction<InvoiceItems[]>>;

   dialogOptions: DialogOptions;
   setDialogOptions: React.Dispatch<React.SetStateAction<DialogOptions>>;
}

interface PosProviderProps {
   children: ReactNode;
}

interface DialogOptions {
   open: boolean;
   title: string;
}

const PosContext = createContext<PosContextProps | undefined>(undefined);

export const PosProvider = ({ children }: PosProviderProps) => {
   const { auth } = useAuth();
   const navigate = useNavigate();

   const [searchFilterItems, setSearchFilterItems] =
      useState<ProductPricesFilterProps>({});

   const [customerCart, setCustomerCart] = useState<InvoiceItems[]>([]);

   const [dialogOptions, setDialogOptions] = useState<DialogOptions>(
      {} as DialogOptions,
   );

   useEffect(() => {
      if (auth.role === 'admin') {
         navigate('/pos');
      } else if (auth.role?.split('_')[1] === 'CDO') {
         setSearchFilterItems({
            approval_status: 'approved',
            warehouse_id: 1,
         });
         navigate('/pos/add-order');
      } else if (auth.role?.split('_')[1] === 'ILI') {
         setSearchFilterItems({
            approval_status: 'approved',
            warehouse_id: 2,
         });
         navigate('/pos/add-order');
      }
   }, [auth.role]);

   const { data: sellableItems } = useProductPricesFilter(searchFilterItems);

   const value = {
      searchFilterItems,
      setSearchFilterItems,

      sellableItems,

      customerCart,
      setCustomerCart,

      dialogOptions,
      setDialogOptions,
   };
   return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
};

export const usePos = () => {
   const context = useContext(PosContext);
   if (context === undefined) {
      throw new Error('usePos must be used within a PosProvider');
   }
   return context;
};
