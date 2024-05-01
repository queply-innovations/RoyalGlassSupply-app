import { fetchInvoiceByCode } from '@/features/invoice/__test__/api';
import {
	InvoiceItems,
	Invoices,
	ReturnInvoice,
} from '@/features/invoice/__test__/types';
import { createContext, useContext, useEffect, useState } from 'react';

interface ReturnInvoiceContextProps {
	returnInvoice: ReturnInvoice;
	setReturnInvoice: React.Dispatch<React.SetStateAction<ReturnInvoice>>;
	invoiceCode: string | undefined;
	setInvoiceCode: React.Dispatch<React.SetStateAction<string | undefined>>;
	returnableItems: InvoiceItems[];
	setReturnableItems: React.Dispatch<React.SetStateAction<InvoiceItems[]>>;
	searchInvoice: (code: string) => Promise<string>;
	selectedInvoice: Invoices | undefined;
	setSelectedInvoice: React.Dispatch<
		React.SetStateAction<Invoices | undefined>
	>;
	selectedItems: InvoiceItems[];
	setSelectedItems: React.Dispatch<React.SetStateAction<InvoiceItems[]>>;
	updateQuantity: (id: number, newQuantity: number) => void;
}

interface ReturnInvoiceProviderProps {
	children: React.ReactNode;
}

const ReturnInvoiceContext = createContext<
	ReturnInvoiceContextProps | undefined
>(undefined);

export const ReturnInvoiceProvider = ({
	children,
}: ReturnInvoiceProviderProps) => {
	// State to store the current invoice for return transaction
	const [returnInvoice, setReturnInvoice] = useState<ReturnInvoice>(
		{} as ReturnInvoice,
	);

	useEffect(() => {
		console.log(returnInvoice);
	}, [returnInvoice]);

	const [selectedInvoice, setSelectedInvoice] = useState<Invoices | undefined>(
		undefined,
	);

	// Invoice code to search for the invoice
	const [invoiceCode, setInvoiceCode] = useState<string | undefined>();

	// List of the invoice items based on the invoice code
	const [returnableItems, setReturnableItems] = useState<InvoiceItems[]>([]);
	const [selectedItems, setSelectedItems] = useState<InvoiceItems[]>([]);

	const searchInvoice = async (code: string) => {
		// Reset all previous states
		setReturnInvoice({} as ReturnInvoice);
		setSelectedInvoice(undefined);
		setReturnableItems([]);
		setSelectedItems([]);

		return await fetchInvoiceByCode(code)
			.then(data => {
				setReturnInvoice({
					// code: data.code,
					invoice_id: data.id,
					refundable_amount: 0,
					refund_status: 'done',
				} as ReturnInvoice);
				setSelectedInvoice(data);
				setReturnableItems(data.invoice_items);
				return 'Invoice found.';
			})
			.catch(() => {
				throw 'Code not found. Please try again.';
			});
	};

	const updateQuantity = (id: number, newQuantity: number) => {
		setReturnInvoice(prevInvoice => {
			return {
				...prevInvoice,
				return_items: prevInvoice.return_items.map(item => {
					if (item.invoice_item_id === id) {
						// If the current item's invoice_item_id matches the provided id,
						// update its quantity and return the updated object
						return { ...item, quantity: newQuantity };
					}
					// If the current item's invoice_item_id does not match the provided id,
					// return the item as is
					return item;
				}),
			};
		});
	};

	useEffect(() => {
		if (returnInvoice.return_items) {
			const refundableAmount = returnInvoice.return_items.reduce(
				(acc, item) => {
					return acc + item.quantity * item.price;
				},
				0,
			);
			setReturnInvoice(prev => ({
				...prev,
				refundable_amount: refundableAmount,
			}));
		}
	}, [returnInvoice.return_items]);

	// useEffect(() => {
	// 	if (invoiceCode) {
	// 		// Fetch the invoice items based on the invoice code
	// 		// setReturnableItems(invoiceItems);
	// 		fetchInvoiceByCode(invoiceCode)
	// 			.then(data => {
	// 				setReturnInvoice({
	// 					code: data.code,
	// 					invoice_id: data.invoice_id,
	// 					refund_status: 'done',
	// 				} as ReturnInvoice);
	// 				setReturnableItems(data.invoice_items);
	// 			})
	// 			.then(error => {
	// 				set;
	// 			});
	// 	}
	// });

	const value = {
		returnInvoice,
		setReturnInvoice,
		invoiceCode,
		setInvoiceCode,
		returnableItems,
		setReturnableItems,
		searchInvoice,
		selectedInvoice,
		setSelectedInvoice,
		selectedItems,
		setSelectedItems,
		updateQuantity,
	};

	return (
		<ReturnInvoiceContext.Provider value={value}>
			{children}
		</ReturnInvoiceContext.Provider>
	);
};

export function useReturnInvoice() {
	const context = useContext(ReturnInvoiceContext);
	if (!context) {
		throw new Error(
			'useReturnInvoice must be used within ReturnInvoiceProvider',
		);
	}

	return context;
}