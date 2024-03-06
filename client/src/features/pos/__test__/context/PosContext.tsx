import { Invoices } from '@/features/invoice/__test__/types';
import {
	useProductPricesQuery,
	useProductQuery,
} from '@/features/product/__test__/hooks';
import { Product, ProductPrices } from '@/features/product/__test__/types';
import {
	ReactNode,
	createContext,
	useContext,
	useState,
	useEffect,
} from 'react';
import { CurrentOrder, Items, Products } from '../types';

interface PosContextProps {
	products: Product[];
	productInfo: ProductPrices[];
	invoice?: Invoices;
	isLoading: boolean;
	selectedProducts: Items[];
	setSelectedProducts: (product: Items[]) => void;
	order: CurrentOrder;
	quantityHandler: (productId: number, newQuantity: number) => void;
}
interface PosProviderProps {
	children: ReactNode;
}
const PosContext = createContext<PosContextProps | undefined>(undefined);

export const PosProvider = ({ children }: PosProviderProps) => {
	const [selectedProducts, setSelectedProducts] = useState<Items[]>([]);
	const [order, setOrder] = useState<CurrentOrder>({} as CurrentOrder);
	const { data: products } = useProductQuery();
	const { data: productInfo, isLoading } = useProductPricesQuery();
	const quantityHandler = (productId: number, newQuantity: number) => {
		console.log('quantityHandler', productId, newQuantity);
		if (newQuantity > 0) {
			setSelectedProducts(prevSelectedProducts =>
				prevSelectedProducts.map((item, index) => {
					if (index === productId) {
						// Ensure that `price` property exists and is a number
						if (typeof item.price === 'number') {
							return {
								...item,
								quantity: newQuantity,
								subtotal: item.price * newQuantity,
							};
						}
					}
					return item;
				}),
			);
		} else {
			setSelectedProducts(prevSelectedProducts =>
				prevSelectedProducts.filter((_, index) => index !== productId),
			);
		}
	};

	useEffect(() => {
		let totalItems = 0;
		let totalAmount = 0;
		selectedProducts.forEach(item => {
			totalItems += item.quantity;
			totalAmount += item.subtotal;
		});
		setOrder({
			items: selectedProducts,
			totalItems,
			totalAmount,
		});
	}, [selectedProducts]);
	const value = {
		quantityHandler,
		order,
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
