import { ReactNode, createContext, useContext } from 'react';
import { Supplier } from '../../types';
import { useSupplierQuery } from '../../__test__/hooks';

export const SupplierContext = createContext<Supplier[] | undefined>(undefined);

interface SupplierProviderProps {
	children: ReactNode;
}

export const SupplierProvider = ({ children }: SupplierProviderProps) => {
	const { data: supplier } = useSupplierQuery();

	return (
		<SupplierContext.Provider value={supplier}>
			{children}
		</SupplierContext.Provider>
	);
};

export function useSupplierContext() {
	const supplier = useContext(SupplierContext);

	if (!supplier) {
		throw new Error('useSupplierContext must be used within SupplierContext');
	}
	return supplier;
}
