import { ReactNode, createContext, useContext, useState } from 'react';
import { Customer } from '../types';
import { useCustomerQuery } from '../hooks/useCustomerQuery';

interface CustomerContextProps {
	data: Customer[];
	isLoading: boolean;
	selectedCustomer: Customer;
	setSelectedCustomer: (customer: Customer) => void;
	openSearchCustomer: boolean;
	setOpenSearchCustomer: (open: boolean) => void;
}

interface CustomerProviderProps {
	children: ReactNode;
}

const CustomerContext = createContext<CustomerContextProps | undefined>(
	undefined,
);

export const CustomerProvider = ({ children }: CustomerProviderProps) => {
	const { data, isLoading } = useCustomerQuery();

	const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
		{} as Customer,
	);
	const [openSearchCustomer, setOpenSearchCustomer] = useState(false);

	const value = {
		data,
		isLoading,
		selectedCustomer,
		setSelectedCustomer,
		openSearchCustomer,
		setOpenSearchCustomer,
	};
	return (
		<CustomerContext.Provider value={value}>
			{children}
		</CustomerContext.Provider>
	);
};

export const useCustomer = () => {
	const context = useContext(CustomerContext);
	if (context === undefined) {
		throw new Error('usePos must be used within a PosProvider');
	}
	return context;
};
