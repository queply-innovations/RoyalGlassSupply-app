import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Invoices } from '../types';
import { useInvoiceQuery } from '../hooks/useInvoiceQuery';
import { useAuth } from '@/context/AuthContext';
import { formatUTCDateOnly, getDateNow } from '@/utils/timeUtils';
import { usePos } from '@/features/pos/__test__/context/PosContext';
import { Warehouse } from '@/features/warehouse/__test__/types';

interface InvoiceContextProps {
	invoices: Invoices[];
	invoiceSelected: Invoices;
	setInvoiceSelected: (invoice: Invoices) => void;
	generateInvoice: (warehouse: Partial<Warehouse>) => void;
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
	const { selectedWarehouse, order } = usePos();

	const [invoiceSelected, setInvoiceSelected] = useState<Invoices>(
		{} as Invoices,
	);

	const [invoice, setInvoice] = useState<Partial<Invoices>>({} as Invoices);

	function generateOR() {
		const date = formatUTCDateOnly(getDateNow());
		const invoiceNumber = invoices.length + 1;
		const paddedInvoiceNumber = invoiceNumber.toString().padStart(5, '0');
		const or_no = `${date}-${auth.user.id}-${paddedInvoiceNumber}`;
		return or_no;
	}

	function generateInvoice() {
		setInvoice({
			issued_by: auth.user.id,
			id: invoices.length + 1,
			code: `IVC-${selectedWarehouse.id}-${invoices.length + 1}`,
			warehouse_id: selectedWarehouse.id,
			customer_id: 1,
			created_at: getDateNow(),
			subtotal: order.totalAmount,
			total_amount_due: order.totalAmount,
			or_no: generateOR(),
		});
		return invoice;
	}

	const value = {
		invoices,
		invoiceSelected,
		setInvoiceSelected,
		generateInvoice,
	};

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
