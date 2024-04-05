import { ReactNode, createContext, useContext, useState } from 'react';
import { Inventory, Invoice } from '../types';
import { useExpensesQuery, useInventoryQuery } from '../hooks';

interface ExpensesContextProps {
	invoices: Invoice[];
	isFetching: boolean;
	selectedInventory: Inventory;
	setSelectedInventory: (inventory: Inventory) => void;
	selectedInvoice: Invoice[];
	setSelectedInvoice: (invoice: Invoice[]) => void;
}

interface ExpensesProviderProps {
	children: ReactNode;
}

const ExpensesContext = createContext<ExpensesContextProps | undefined>(
	undefined,
);
export const ExpensesProvider = ({ children }: ExpensesProviderProps) => {
	// State of the selected inventory
	const [selectedInventory, setSelectedInventory] = useState<Inventory>(
		{} as Inventory,
	);
	const [selectedInvoice, setSelectedInvoice] =
		useState<Invoice[]>([]);
	// Destructured response data and loading state from useInventoryQuery hook
	const { invoices, invoiceQuery, isFetching } = useExpensesQuery();
	const value = {
		invoices,
		isFetching,
		selectedInventory,
		setSelectedInventory,
		selectedInvoice,
		setSelectedInvoice
	};

	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
};

export function useExpenses() {
	const context = useContext(ExpensesContext);

	if (!context) {
		throw new Error(
			'useExpenses hook must be used within InventoryProvider',
		);
	}
	return context;
}
