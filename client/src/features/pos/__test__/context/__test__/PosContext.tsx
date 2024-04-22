import { useAuth } from '@/context/AuthContext';
import { useInvoiceCodeQuery } from '@/features/invoice/__test__/hooks/useInvoiceQuery';
import { InvoiceItems, Invoices } from '@/features/invoice/__test__/types';
import { useProductPricesFilter } from '@/features/product/__test__/hooks';
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
	productListing: ProductPrices[];
	isLoading: boolean;

	invoiceItemsQueue: InvoiceItems[];
	setInvoiceItemsQueue: (invoiceItems: InvoiceItems[]) => void;
	setFilter: (filter: object) => void;
	quantityHandler: (
		productId: number,
		newQuantity: number,
		maxQuantity: number,
	) => void;

	selectedWarehouse: string;
	setSelectedWarehouse: (warehouse: string) => void;

	// invoiceCodeResult: Invoices;
	setInvoiceCode: (code: string) => void;
	openDialog: boolean;
	setOpenDialog: (open: boolean) => void;
}

interface PosProviderProps {
	children: ReactNode;
}

const PosContext = createContext<PosContextProps | undefined>(undefined);

export const PosProvider = ({ children }: PosProviderProps) => {
	const { auth } = useAuth();
	const navigate = useNavigate();

	const [openDialog, setOpenDialog] = useState<boolean>(false);

	useEffect(() => {
		if (auth.role === 'admin') {
			navigate('/pos');
		} else if (auth.role?.split('_')[1] === 'CDO') {
			setFilter({
				approval_status: 'approved', //TODO Possible to comment out
				active_status: 'active',
				warehouse_id: 1,
			});
			setSelectedWarehouse('CDO');
			navigate('/pos/add-order');

			// setInvoice({
			// 	...invoice,
			// 	warehouse_id: 1,
			// });
		} else if (auth.role?.split('_')[1] === 'ILI') {
			setFilter({
				approval_status: 'approved', //TODO Possible to comment out
				active_status: 'active',
				warehouse_id: 2,
			});
			setSelectedWarehouse('Iligan');
			navigate('/pos/add-order');

			// setInvoice({
			// 	...invoice,
			// 	warehouse_id: 2,
			// });
		}
	}, []);
	const [invoiceItemsQueue, setInvoiceItemsQueue] = useState<InvoiceItems[]>(
		[],
	);

	const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');

	const [filter, setFilter] = useState<object>({});

	const [invoiceCode, setInvoiceCode] = useState<string>('');

	// const { invoice: invoiceCodeResult } = useInvoiceCodeQuery(invoiceCode);
	const { data: productListing, isLoading } = useProductPricesFilter(filter);

	const quantityHandler = (
		productId: number,
		newQuantity: number,
		maxQuantity: number,
	) => {
		if (newQuantity > 0 && newQuantity <= maxQuantity) {
			setInvoiceItemsQueue(prev =>
				prev.map((item, index) => {
					if (index === productId) {
						// Ensure that `price` property exists and is a number
						if (typeof item.product_price === 'number') {
							return {
								...item,
								quantity: newQuantity,
								subtotal: item.product_price * newQuantity,
							};
						}
					}
					return item;
				}),
			);
		} else if (newQuantity === 0) {
			setInvoiceItemsQueue(prev =>
				prev.filter((_, index) => index !== productId),
			);
		}
	};

	// useEffect(() => {
	// 	auth.role === 'admin'
	// 		? setFilter({ warehouse_id: 1 })
	// 		: setFilter({ warehouse_id: 2 });
	// }, []);

	const value = {
		productListing,
		isLoading,
		setFilter,
		invoiceItemsQueue,
		setInvoiceItemsQueue,
		quantityHandler,
		selectedWarehouse,
		setSelectedWarehouse,
		// invoiceCodeResult,
		setInvoiceCode,
		openDialog,
		setOpenDialog,
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
