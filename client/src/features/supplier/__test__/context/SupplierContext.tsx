import { ReactNode, createContext, useContext, useState } from 'react';
import { Supplier } from '../../types';
import { useSupplierQuery } from '../../__test__/hooks';

interface SupplierContextProps {
	suppliers: Supplier[];
	isFetching: boolean;
	progress: any;
	selectedSupplier: Supplier;
	setSelectedSupplier: (supplier: Supplier) => void;
}

export const SupplierContext = createContext<SupplierContextProps | undefined>(
	undefined,
);

interface SupplierProviderProps {
	children: ReactNode;
}

export const SupplierProvider = ({ children }: SupplierProviderProps) => {
	const { suppliers, isFetching, progress } = useSupplierQuery();

	const [selectedSupplier, setSelectedSupplier] =
		useState<Supplier>({} as Supplier);

	const value = { suppliers, isFetching, progress, selectedSupplier, setSelectedSupplier };

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
