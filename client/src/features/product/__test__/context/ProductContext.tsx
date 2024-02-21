import { ReactNode, createContext, useContext, useState } from 'react';
import { ProductPrices } from '../types';
import { useProductQuery } from '../hooks';

interface ProductContextProps {
	productsData: ProductPrices[];
	// productPrices: ProductPrices[];
	selectedProduct: ProductPrices;
	setSelectedProduct: (product: ProductPrices) => void;
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
	const [selectedProduct, setSelectedProduct] = useState<ProductPrices>({
		id: 0,
		product_id: 0,
		product: {
			id: 0,
			name: '',
			serial_no: 0,
			brand: '',
			size: '',
			color: '',
			notes: '',
		},
		type: '',
		unit: '',
		stocks_quantity: 0,
		stocks_unit: '',
		capital_price: 0,
		markup_price: 0,
		retail_price: 0,
		tax_amount: 0,
		cost: 0,
		on_sale: 0,
		sale_price: 0,
		price: 0,
		warehouse_id: 0,
		created_by: 0,
		approval_status: '',
		approved_by: 0,
		created_at: '',
		updated_at: '',
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
