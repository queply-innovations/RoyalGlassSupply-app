import { ReactNode, createContext, useContext, useState } from 'react';
import { Invoices } from '../types';
import { useInvoiceQuery } from '../hooks/useInvoiceQuery';
import { useAuth } from '@/context/AuthContext';

interface InvoiceContextProps {
	invoices: Invoices[];
	invoiceSelected: Invoices;
	setInvoiceSelected: (invoice: Invoices) => void;
}

interface InvoiceProviderProps {
	children: ReactNode;
}

const InvoiceContext = createContext<InvoiceContextProps | undefined>(
	undefined,
);

export const InvoiceProvider = ({ children }: InvoiceProviderProps) => {
	const auth = useAuth();
	const { invoices } = useInvoiceQuery();

	const [invoiceSelected, setInvoiceSelected] = useState<Invoices>(
		{} as Invoices,
	);

	const value = {
		invoices,
		invoiceSelected,
		setInvoiceSelected,
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
