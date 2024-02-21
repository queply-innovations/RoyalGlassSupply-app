import { ReactNode, createContext, useContext, useState } from 'react';
import { Product, ProductPrices } from '../types';
import { useProductQuery } from '../hooks';

interface ProductContextProps {
	productsData: ProductPrices[];
	// productPrices: ProductPrices[];
	selectedProduct: Product;
	setSelectedProduct: (product: Product) => void;
	// selectedProductPrice: ProductPrices;
	// setSelectedProductPrice: (productPrice: ProductPrices) => void;
}
interface ProductProviderProps {
	children: ReactNode;
}
const ProductContext = createContext<ProductContextProps | undefined>(
	undefined,
);

export const ProductsProvider = ({ children }: ProductProviderProps) => {
	const [selectedProduct, setSelectedProduct] = useState<Product>({
		id: 0,
		name: '',
		serial_no: 0,
		brand: '',
		size: '',
		color: '',
		notes: '',
	});
	const { productsData } = useProductQuery();
	console.log('products', productsData);
	const value = { productsData, selectedProduct, setSelectedProduct };
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
