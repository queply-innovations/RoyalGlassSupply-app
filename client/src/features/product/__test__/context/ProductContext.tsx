import { ReactNode, createContext, useContext, useState } from 'react';
import { Product } from '../types';
import { useProductQuery } from '../hooks';

interface ProductContextProps {
	data: Product[];
	isLoading: boolean;
	selectedProduct: Product | undefined;
	setSelectedProduct: React.Dispatch<
		React.SetStateAction<Product | undefined>
	>;
}
interface ProductProviderProps {
	children: ReactNode;
}
const ProductContext = createContext<ProductContextProps | undefined>(
	undefined,
);

export const ProductsProvider = ({ children }: ProductProviderProps) => {
	// State of the selected product
	const [selectedProduct, setSelectedProduct] = useState<
		Product | undefined
	>();
	// Destructured response data and loading state from useProductQuery hook
	const { data, isLoading } = useProductQuery();
	const value = {
		data,
		isLoading,
		selectedProduct,
		setSelectedProduct,
	};

	return (
		<ProductContext.Provider value={value}>
			{children}
		</ProductContext.Provider>
	);
};

/**
 * Provides access to the products context.
 * Must be a child node of `<ProductsProvider>`.
 * @returns The product prices context.
 */
export function useProducts() {
	const context = useContext(ProductContext);

	if (!context) {
		throw new Error('useProducts hook must be used within ProductsProvider');
	}
	return context;
}
