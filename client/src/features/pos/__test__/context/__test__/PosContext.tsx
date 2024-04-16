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
}

interface PosProviderProps {
	children: ReactNode;
}

const PosContext = createContext<PosContextProps | undefined>(undefined);

export const PosProvider = ({ children }: PosProviderProps) => {
	const [invoiceItemsQueue, setInvoiceItemsQueue] = useState<InvoiceItems[]>(
		[],
	);

	const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');

	const [filter, setFilter] = useState<object>({
		approval_status: 'approved',
		active_status: 'active',
	});
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
