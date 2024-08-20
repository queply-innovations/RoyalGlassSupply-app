import { fetchInvoiceByCode } from '@/features/invoice/__test__/api';
import {
	InvoiceItems,
	Invoices,
	ReturnInvoice,
} from '@/features/invoice/__test__/types';
import { createContext, useContext, useEffect, useState } from 'react';
import {
	fetchReturnTransactionByCode,
	submitReturnInvoice,
} from '../api/Returns';
import { useAuth } from '@/context/AuthContext';
import { Voucher } from '@/features/customer/__test__/types';

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
	handleSubmit: () => Promise<string>;
	isSubmitting: boolean;
	setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
	removeReturnItem: (id: number) => void;

	voucher: Voucher | undefined;
	setVoucher: React.Dispatch<React.SetStateAction<Voucher | undefined>>;
	isVoucherDialogOpen: boolean;
	setIsVoucherDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

	// State to store the selected invoice for return transaction
	const [selectedInvoice, setSelectedInvoice] = useState<Invoices | undefined>(
		undefined,
	);

	// Invoice code to search for the invoice
	const [invoiceCode, setInvoiceCode] = useState<string | undefined>();

	// List of the invoice items based on the invoice code
	const [returnableItems, setReturnableItems] = useState<InvoiceItems[]>([]);
	const [selectedItems, setSelectedItems] = useState<InvoiceItems[]>([]);

	// Show generated voucher
	const [voucher, setVoucher] = useState<Voucher | undefined>();
	const [isVoucherDialogOpen, setIsVoucherDialogOpen] = useState(false);

	const { auth } = useAuth();
	const searchInvoice = async (code: string) => {
		// Reset all previous states
		setReturnInvoice({} as ReturnInvoice);
		setSelectedInvoice(undefined);
		setReturnableItems([]);
		setSelectedItems([]);

		// Search for exisiting return transaction
		return await fetchReturnTransactionByCode(`RET-${code}`).then(
			returnItems => {
				const item = returnItems.find(
					returnItem => returnItem.code === `RET-${code}`,
				);

				// If a return transaction is not found, fetch the invoice by code
				if (
					item === undefined ||
					(item.refund_status !== 'done' &&
						item.refund_status !== 'pending')
				) {
					return fetchInvoiceByCode(code)
						.then(data => {
							setReturnInvoice({
								code: `RET-${data.code}`,
								invoice_id: data.id,
								issued_by: auth?.user.id || 0,
								refundable_amount: 0,
								refund_status: 'done',
								is_cash_refund: 0,
							} as ReturnInvoice);
							setSelectedInvoice(data);
							setReturnableItems(data.invoice_items);
							return 'Invoice found.';
						})
						.catch(() => {
							throw 'Code not found. Please try again.';
						});
				} else if (item?.refund_status === 'pending') {
					// If a return transaction is found, throw an error
					throw 'Invoice has a pending return transaction.';
				} else {
					// If a return transaction is found, throw an error
					throw 'Invoice already has a return transaction.';
				}
			},
		);
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
					//@ts-expect-error 'price' does not exist on type 'InvoiceItems'
					return acc + item.quantity * item.price.price;
				},
				0,
			);
			setReturnInvoice(prev => ({
				...prev,
				refundable_amount: refundableAmount,
			}));
		}
	}, [returnInvoice.return_items]);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleSubmit = async () => {
		// Submit the return invoice
		setIsSubmitting(true);
		return await submitReturnInvoice(returnInvoice)
			.then(() => {
				setReturnInvoice({} as ReturnInvoice);
				setSelectedInvoice(undefined);
				setReturnableItems([]);
				setSelectedItems([]);
				setIsSubmitting(false);
				return 'Return items successfully submitted. Please wait for approval from admin.';
			})
			.catch(() => {
				setIsSubmitting(false);
				throw 'Failed to return items. Please try again.';
			});
	};

	// Function to remove an item from the selected items
	const removeReturnItem = (id: number) => {
		setSelectedItems(prevItems => prevItems.filter(item => item.id !== id));
		setReturnInvoice(prevInvoice => {
			return {
				...prevInvoice,
				return_items: prevInvoice.return_items.filter(
					item => item.invoice_item_id !== id,
				),
			};
		});
	};

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
		handleSubmit,
		isSubmitting,
		setIsSubmitting,
		removeReturnItem,
		voucher,
		setVoucher,
		isVoucherDialogOpen,
		setIsVoucherDialogOpen,
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
