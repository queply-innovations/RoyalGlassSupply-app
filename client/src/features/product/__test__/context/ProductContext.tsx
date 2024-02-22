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
		quantity: 0,
		stocks_unit: '',
		capital_price: 0,
		markup_price: 0,
		retail_price: 0,
		tax_amount: 0,
		cost: 0,
		on_sale: 0,
		sale_price: 0,
		price: 0,
		warehouse: {
			id: 0,
			name: '',
		},
		created_by: {
			id: 0,
			firstname: '',
			lastname: '',
		},
		approval_status: '',
		approved_by: {
			id: 0,
			firstname: '',
			lastname: '',
		},
		created_at: '',
		updated_at: '',
		active_status: '',
	});
	const { productsData } = useProductQuery();
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
