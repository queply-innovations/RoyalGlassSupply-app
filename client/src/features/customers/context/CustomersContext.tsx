import { ReactNode, createContext, useContext, useState } from 'react';
import { CustomerSale } from '../types';
import { useCustomersQuery } from '../hooks';

interface CustomersContextProps {
	customers: CustomerSale[] | undefined;
	isFetching: boolean;
	selectedCustomer: CustomerSale | undefined;
	setSelectedCustomer: (customer: CustomerSale) => void;
}

export const CustomersContext = createContext<
	CustomersContextProps | undefined
>(undefined);

interface CustomersProviderProps {
	children: ReactNode;
}

export const CustomersProvider = ({ children }: CustomersProviderProps) => {
	const [selectedCustomer, setSelectedCustomer] = useState<
		CustomerSale | undefined
	>(undefined);
	const { customers, isFetching } = useCustomersQuery();

	const value = {
		customers,
		isFetching,
		selectedCustomer,
		setSelectedCustomer,
	};

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
