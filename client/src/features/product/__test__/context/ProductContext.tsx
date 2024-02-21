import { ReactNode, createContext, useContext } from 'react';
import { Product } from '../types';
import { useWarehouseQuery } from '../../__test__/hooks';

const ProductContext = createContext<Product[] | undefined>(undefined);

interface ProductContextProps {}
interface ProductProviderProps {
	children: ReactNode;
}

export const WarehouseProvider = ({ children }: ProductProviderProps) => {
	const { warehouses } = useWarehouseQuery();

	return (
		<ProductContext.Provider value={warehouses}>
			{children}
		</ProductContext.Provider>
	);
};

export function useWarehouse() {
	const context = useContext(ProductContext);

	if (!context) {
		throw new Error('useProductContext must be used within ProductContext');
	}
	return context;
}
