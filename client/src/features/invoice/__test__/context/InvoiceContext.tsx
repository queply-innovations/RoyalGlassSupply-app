import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { InvoiceItemDatabase, InvoiceItems, Invoices } from '../types';
import { useInvoiceQuery } from '../hooks/useInvoiceQuery';
import { useAuth } from '@/context/AuthContext';
import { formatUTCDateOnly, getDateNow } from '@/utils/timeUtils';
import { Warehouse } from '@/features/warehouse/__test__/types';

interface InvoiceContextProps {
	invoices: Invoices[];
	invoiceSelected: Invoices;
	setInvoiceSelected: (invoice: Invoices) => void;
	// generateInvoice: (warehouse: Partial<Warehouse>) => void;
	invoice: Partial<Invoices>;
	setInvoice: (invoice: Partial<Invoices>) => void;
	handleChange: (key: string, value: Invoices[keyof Invoices]) => void;
	formatCurrency: (value: number) => string;
	// AddInvoiceItems: () => void;
	invoiceItems: Partial<InvoiceItems>[];

	//New invoice Props
	invoiceItemsQueue: InvoiceItemDatabase[];
	setInvoiceItemsQueue: (invoiceItems: InvoiceItemDatabase[]) => void;
	quantityHandler: (
		productId: number,
		newQuantity: number,
		maxQuantity: number,
	) => void;
	discountHandler: (TIndex: number, TValue: number) => void;
	handleInvoiceItemsChange: (
		TIndex: number,
		key: keyof InvoiceItemDatabase,
		value: InvoiceItemDatabase[keyof InvoiceItemDatabase],
	) => void;
	handleRemoveInvoiceItem: (TIndex: number) => void;
}

interface InvoiceProviderProps {
	children: ReactNode;
}

const InvoiceContext = createContext<InvoiceContextProps | undefined>(
	undefined,
);

export const InvoiceProvider = ({ children }: InvoiceProviderProps) => {
	const { auth } = useAuth();
	const { invoices } = useInvoiceQuery();

	const [invoiceItemsQueue, setInvoiceItemsQueue] = useState<
		InvoiceItemDatabase[]
	>([]);

	const [invoiceSelected, setInvoiceSelected] = useState<Invoices>(
		{} as Invoices,
	);
	const [invoiceItems, setInvoiceItems] = useState<Partial<InvoiceItems>[]>(
		[],
	);
	const [invoice, setInvoice] = useState<Partial<Invoices>>({
		issued_by: auth.user.id,
		id: invoices.length + 1,
		total_amount_due: 0,
		change_amount: 0,
		subtotal: 0,
		payment_method: '',
		reference_no: '',
		paid_amount: 0,
		total_discount: 0,
	} as Invoices);

	function handleChange(key: string, value: Invoices[keyof Invoices]) {
		setInvoice(prev => ({
			...prev,
			[key]: value,
		}));
	}

	function handleInvoiceItemsChange(
		TIndex: number,
		key: keyof InvoiceItemDatabase,
		value: InvoiceItemDatabase[keyof InvoiceItemDatabase],
	) {
		setInvoiceItemsQueue(prev =>
			prev.map((item, index) => {
				if (index === TIndex) {
					const updatedItem = {
						...item,
						[key]: value,
					};
					updatedItem.total_price =
						updatedItem.product_price * updatedItem.quantity -
						updatedItem.item_discount;
					return updatedItem;
				}
				return item;
			}),
		);
	}

	function handleRemoveInvoiceItem(TIndex: number) {
		setInvoiceItemsQueue(prev => prev.filter((_, index) => index !== TIndex));
	}
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
								total_price:
									Number(
										Number(item.product_price * newQuantity).toFixed(
											2,
										),
									) - item.item_discount,
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

	const discountHandler = (TIndex: number, TValue: number) => {
		setInvoiceItemsQueue(prev =>
			prev.map((item, index) => {
				if (index === TIndex) {
					return {
						...item,
						item_discount: TValue,
						total_price: item.product_price * item.quantity - TValue,
					};
				}
				return item;
			}),
		);
	};

	// function AddInvoiceItems() {
	// 	selectedProducts.forEach(product => {
	// 		setInvoiceItems(prev => [
	// 			...prev,
	// 			{
	// 				invoice_id: invoice.id,
	// 				product_id: product.product.id,
	// 				product_price_id: product.product.product?.id,
	// 				product_price: product.price,
	// 				quantity: product.quantity,
	// 				unit: product.product.unit,
	// 				item_discount: 0,
	// 				discount_approval_status: '',
	// 				approved_by: 0,
	// 				source_inventory: selectedWarehouse.id,
	// 			},
	// 		]);
	// 	});
	// }

	// function generateOR() {
	// 	const date = formatUTCDateOnly(getDateNow());
	// 	const invoiceNumber = invoices.length + 1;
	// 	const paddedInvoiceNumber = invoiceNumber.toString().padStart(5, '0');
	// 	const or_no = `${date}-${auth.user.id}-${paddedInvoiceNumber}`;
	// 	return or_no;
	// }

	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'PHP',
		}).format(value);
	}

	// function generateInvoice() {
	// 	setInvoice(prev => ({
	// 		...prev,
	// 		issued_by: auth.user.id,
	// 		id: invoices.length + 1,
	// 		code: `IVC-${selectedWarehouse.id}-${invoices.length + 1}`,
	// 		warehouse_id: selectedWarehouse.id,
	// 		customer_id: 1,
	// 		created_at: getDateNow(),
	// 		subtotal: order.totalAmount,
	// 		total_amount_due: order.totalAmount,
	// 		or_no: '',
	// 	}));
	// 	return invoice;
	// }

	const value = {
		invoices,
		invoiceSelected,
		setInvoiceSelected,
		// generateInvoice,
		invoice,
		handleChange,
		formatCurrency,
		invoiceItems,

		// AddInvoiceItems,

		//New invoice Props
		invoiceItemsQueue,
		setInvoiceItemsQueue,
		quantityHandler,
		discountHandler,
		handleInvoiceItemsChange,
		handleRemoveInvoiceItem,
		setInvoice,
	};
	useEffect(() => {
		setInvoice({
			...invoice,
			issued_by: auth.user.id,
			id: invoices.length + 1,
			// code: `IVC-${selectedWarehouse.id}-${invoice?.id}`,
			// warehouse_id: selectedWarehouse.id,
			total_amount_due: 0,
			change_amount: 0,
			subtotal: 0,
			payment_method: 'payment',
			reference_no: '',
			paid_amount: 0,
			total_discount: 0,
		});
	}, []);
	return (
		<InvoiceContext.Provider value={value}>
			{children}
		</InvoiceContext.Provider>
	);
};

export const useInvoice = () => {
	const context = useContext(InvoiceContext);

	if (!context) {
		throw new Error('useInvoice must be used within InvoiceContext');
	}
	return context;
};
