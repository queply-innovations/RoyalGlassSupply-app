import { ReactNode, createContext, useContext, useState } from 'react';
import { ProductPrices } from '../types';
import { useProductPricesQuery } from '../hooks';

interface ProductPricesContextProps {
	data: ProductPrices[];
	isLoading: boolean;
	selectedProductPrice: ProductPrices;
	setSelectedProductPrice: (productPrice: ProductPrices) => void;
}

interface ProductPricesProviderProps {
	children: ReactNode;
}

const ProductPricesContext = createContext<
	ProductPricesContextProps | undefined
>(undefined);

export const ProductPricesProvider = ({
	children,
}: ProductPricesProviderProps) => {
	// State of the selected product price/listing
	const [selectedProductPrice, setSelectedProductPrice] =
		useState<ProductPrices>({} as ProductPrices);
	// Destructured response data and loading state from useProductPricesQuery hook
	const { data, isLoading } = useProductPricesQuery();
	const value = {
		data,
		isLoading,
		selectedProductPrice,
		setSelectedProductPrice,
	};

	return (
		<ProductPricesContext.Provider value={value}>
			{children}
		</ProductPricesContext.Provider>
	);
};

/**
 * Provides access to the product prices context.
 * Must be a child node of `<ProductPricesProvider>`.
 * @returns The product prices context.
 */
export function useProductPrices() {
	const context = useContext(ProductPricesContext);

	if (!context) {
		throw new Error(
			'useProductPrices hook must be used within ProductPricesProvider',
		);
	}
	return context;
}
