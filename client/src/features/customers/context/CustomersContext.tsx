import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Invoice, Customer } from '../types';
import { useCustomersQuery } from '../hooks';

interface CustomersContextProps {
	invoices: Invoice[];
	isFetching: boolean;
	customers: Customer[];
	selectedInvoice: Invoice[];
	setSelectedInvoice: (invoice: Invoice[]) => void;
}

export const CustomersContext = createContext<CustomersContextProps | undefined>(
	undefined,
);

interface CustomersProviderProps {
	children: ReactNode;
}

export const CustomersProvider = ({ children }: CustomersProviderProps) => {
	const [selectedInvoice, setSelectedInvoice] =
		useState<Invoice[]>([]);
	const [ customersList, setCustomersList ] = useState<any>([]);
	const { invoices, isFetching } = useCustomersQuery();
	const [ customers, setCustomers ] = useState<Customer[]>([])

	invoices.map((invoice: any) => {
		if (!customersList.includes(invoice.customer.id)) {
			setCustomersList([...customersList, invoice.customer.id ]);
		}
	});

	useEffect(() => {
		customersList.map((customer: number) => {
			setCustomers([...customers, { 
				id: customer, 
				invoices: invoices.filter((invoice: any) => invoice.customer.id === customer) 
			}]);
		});
	}, [customersList]);

	const value = { invoices, isFetching, customers, selectedInvoice, setSelectedInvoice};

	return (
		<CustomersContext.Provider value={value}>
			{children}
		</CustomersContext.Provider>
	);
};

export function useCustomers() {
	const context = useContext(CustomersContext);

	if (!context) {
		throw new Error(
			'useCustomersContext must be used within CustomersContext',
		);
	}
	return context;
}