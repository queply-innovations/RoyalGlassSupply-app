import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Invoice, UserSales, User } from '../types';
import { useUserSalesQuery } from '../hooks';

interface UserSalesContextProps {
	invoices: Invoice[];
	isFetching: boolean;
	users: [];
	userSales: UserSales[];
	selectedInvoice: Invoice[];
	setSelectedInvoice: (invoice: Invoice[]) => void;
}

export const UserSalesContext = createContext<UserSalesContextProps | undefined>(
	undefined,
);

interface UserSalesProviderProps {
	children: ReactNode;
}

export const UserSalesProvider = ({ children }: UserSalesProviderProps) => {
	const [selectedInvoice, setSelectedInvoice] =
		useState<Invoice[]>([]);
	const [ users, setUser ] = useState<any>([]);
	const { invoices, isFetching } = useUserSalesQuery();
	const [ userSales, setUserSales ] = useState<UserSales[]>([]);

	invoices.map((invoice) => {
		if (!users.includes(invoice.issued_by.id)) {
			setUser([...users, invoice.issued_by.id ]);
		}
	});

	useEffect(() => {
		users.map((user: number) => {
			setUserSales([...userSales, { 
				id: user, 
				invoices: invoices.filter((invoice) => invoice.issued_by.id === user) 
			}]);
		});
	}, [users]);

	const value = { invoices, isFetching, users, userSales, selectedInvoice, setSelectedInvoice};

	return (
		<UserSalesContext.Provider value={value}>
			{children}
		</UserSalesContext.Provider>
	);
};

export function useUserSales() {
	const context = useContext(UserSalesContext);

	if (!context) {
		throw new Error(
			'useUserSalesContext must be used within UserSalesContext',
		);
	}
	return context;
}
