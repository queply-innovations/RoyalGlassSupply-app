import { ReactNode, createContext, useContext } from 'react';
import { Supplier } from '../../types';
import { useSupplierQuery } from '../../__test__/hooks';

interface SupplierContextProps {
	suppliers: Supplier[];
	isFetching: boolean;
	progress: any;
}

export const SupplierContext = createContext<SupplierContextProps | undefined>(
	undefined,
);

interface SupplierProviderProps {
	children: ReactNode;
}

export const SupplierProvider = ({ children }: SupplierProviderProps) => {
	const { suppliers, isFetching, progress } = useSupplierQuery();

	const value = { suppliers, isFetching, progress };

	return (
		<SupplierContext.Provider value={value}>
			{children}
		</SupplierContext.Provider>
	);
};

export function useSupplier() {
	const supplier = useContext(SupplierContext);

	if (!supplier) {
		throw new Error('useSupplierContext must be used within SupplierContext');
	}
	return supplier;
}
