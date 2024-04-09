import { createContext, useContext, useState } from 'react';
import { ProductPrices } from '@/features/product/__test__/types';
import { useProductPricesFilter } from '@/features/product/__test__/hooks';

interface PendingProductPriceContextProps {
	data: ProductPrices[];
	isLoading: boolean;
	selectedProductPrice: ProductPrices;
	setSelectedProductPrice: React.Dispatch<React.SetStateAction<ProductPrices>>;
}

interface PendingProductPriceProviderProps {
	children: React.ReactNode;
}

const PendingProductPriceContext = createContext<
	PendingProductPriceContextProps | undefined
>(undefined);

export const PendingProductPriceProvider = ({
	children,
}: PendingProductPriceProviderProps) => {
	const [selectedProductPrice, setSelectedProductPrice] =
		useState<ProductPrices>({} as ProductPrices);

	const { data, isLoading } = useProductPricesFilter({
		approval_status: 'pending',
	});
	const value = {
		data,
		isLoading,
		selectedProductPrice,
		setSelectedProductPrice,
	};

	return (
		<PendingProductPriceContext.Provider value={value}>
			{children}
		</PendingProductPriceContext.Provider>
	);
};

export function usePendingProductPrice() {
	const context = useContext(PendingProductPriceContext);

	if (!context) {
		throw new Error(
			'usePendingProductPrice hook must be used within PendingProductPriceProvider',
		);
	}
	return context;
}
