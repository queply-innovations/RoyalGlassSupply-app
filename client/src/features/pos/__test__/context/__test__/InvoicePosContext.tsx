import { useAuth } from '@/context/AuthContext';
import { Invoices } from '@/features/invoice/__test__/types';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import currency from 'currency.js';
import { CartItem } from '../../types';

interface InvoicePosContextProps {
	currentInvoicePos: Partial<Invoices>;
	setCurrentInvoicePos: React.Dispatch<Partial<Invoices>>;

	cartItems: CartItem[];
	setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;

	// invoiceItemsDatabase: InvoiceItemDatabase[];
	// setInvoiceItemsDatabase: React.Dispatch<InvoiceItemDatabase[]>;

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

	const [currentInvoicePos, setCurrentInvoicePos] = useState<
		Partial<Invoices>
	>({
		issued_by: auth.user.id,
		total_amount_due: 0,
		change_amount: 0,
		subtotal: 0,
		type: 'payment',
		payment_method: 'cash',
		reference_no: '',
		paid_amount: 0,
		total_discount: 0,
		delivery_charge: 0,
		status: 'approved',
	} as Invoices);

	// const [currentInvoiceItemsQueue, setCurrentInvoiceItemsQueue] = useState<
	// 	Partial<InvoiceItems>[]
	// >([]);

	// State for cart items
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	// const [invoiceItemsDatabase, setInvoiceItemsDatabase] = useState<
	// 	InvoiceItemDatabase[]
	// >([]);

	const invoiceSubtotal = useMemo(() => {
		return cartItems.reduce(
			(acc, currentItem) => acc + (currentItem.total_price ?? 0),
			0,
		);
	}, [cartItems]);

	useEffect(() => {
		setCurrentInvoicePos(prev => {
			const totalAmountDue =
				invoiceSubtotal -
					(prev.total_discount ?? 0) +
					(prev.delivery_charge ?? 0) +
					(prev.total_tax ?? 0) || 0;
			return {
				...prev,
				subtotal: invoiceSubtotal,
				total_amount_due: totalAmountDue >= 0 ? totalAmountDue : 0,
			};
		});
		if (currentInvoicePos.payment_method === 'purchase_order') {
			setCurrentInvoicePos(prev => ({
				...prev,
				balance_amount: currentInvoicePos.total_amount_due ?? 0,
				paid_amount: 0,
			}));
		}
	}, [
		invoiceSubtotal,
		currentInvoicePos.payment_method,
		currentInvoicePos.total_discount,
		currentInvoicePos.delivery_charge,
	]);

	// Change handling
	useEffect(() => {
		setCurrentInvoicePos(prev => ({
			...prev,
			change_amount: currency(
				(prev.paid_amount ?? 0) - (prev.total_amount_due ?? 0),
			).value,
		}));
	}, [currentInvoicePos.paid_amount, currentInvoicePos.total_amount_due]);

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
		if (newQuantity > 0 && newQuantity <= maxQuantity) {
			setCartItems(prev =>
				prev.map((item, index) => {
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
		}
	}

	function removeInvoiceItem(tableIndex: number) {
		setCartItems(prev => prev.filter((_, index) => index !== tableIndex));
	}

	// TODO - eyb print invoice
	const [fullData, setFullData] = useState<any>();

	const value = {
		currentInvoicePos,
		setCurrentInvoicePos,

		// currentInvoiceItemsQueue,
		// setCurrentInvoiceItemsQueue,

		cartItems,
		setCartItems,

		// invoiceItemsDatabase,
		// setInvoiceItemsDatabase,

		// addInvoiceItems,
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
