import { ReactNode, createContext, useContext } from 'react';
import { Product, ProductPrices } from '../types';

interface ProductContextProps {
	products: Product[];
	productPrices: ProductPrices[];
	selectedProduct: Product;
	setSelectedProduct: (product: Product) => void;
	selectedProductPrice: ProductPrices;
	setSelectedProductPrice: (productPrice: ProductPrices) => void;
}
interface ProductProviderProps {
	children: ReactNode;
}
const ProductContext = createContext<ProductContextProps | undefined>(
	undefined,
);

export const ProductsProvider = ({ children }: ProductProviderProps) => {
	const value = {};
	return (
		<ProductContext.Provider value={value}>
			{children}
		</ProductContext.Provider>
	);
};

export function useProducts() {
	const context = useContext(ProductContext);

	if (!context) {
		throw new Error('useProductContext must be used within ProductContext');
	}
	return context;
}
