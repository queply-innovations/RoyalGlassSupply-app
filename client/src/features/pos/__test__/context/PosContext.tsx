import { Invoices } from '@/features/invoice/__test__/types';
import {
	useProductPricesQuery,
	useProductQuery,
} from '@/features/product/__test__/hooks';
import { Product, ProductPrices } from '@/features/product/__test__/types';
import { ReactNode, createContext, useContext, useState } from 'react';
import { Items, Products } from '../types';

interface PosContextProps {
	products: Product[];
	productInfo: ProductPrices[];
	invoice?: Invoices;
	isLoading: boolean;
	selectedProducts: Items[];
	setSelectedProducts: (product: Items[]) => void;
}
interface PosProviderProps {
	children: ReactNode;
}
const PosContext = createContext<PosContextProps | undefined>(undefined);

export const PosProvider = ({ children }: PosProviderProps) => {
	const [selectedProducts, setSelectedProducts] = useState<Items[]>([]);
	const { data: products } = useProductQuery();
	const { data: productInfo, isLoading } = useProductPricesQuery();
	const value = {
		products,
		productInfo,
		isLoading,
		selectedProducts,
		setSelectedProducts,
	};

	return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
};

export const usePos = () => {
	const context = useContext(PosContext);
	if (context === undefined) {
		throw new Error('usePos must be used within a PosProvider');
	}
	return context;
};
