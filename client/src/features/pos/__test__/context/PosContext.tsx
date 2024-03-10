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
import { CurrentOrder, Items } from '../types';
import { Warehouse } from '@/features/warehouse/__test__/types';

interface PosContextProps {
	products: Product[];
	productInfo: ProductPrices[];
	invoice?: Invoices;
	isLoading: boolean;
	selectedProducts: Items[];
	setSelectedProducts: (product: Items[]) => void;
	order: CurrentOrder;
	quantityHandler: (
		productId: number,
		newQuantity: number,
		maxQuantity: number,
	) => void;
	warehouseProducts: ProductPrices[];
	setWarehouseProducts: (warehouse: Pick<Warehouse, 'code'>) => void;
	selectedWarehouse: Partial<Warehouse>;
	setSelectedWarehouse: (warehouse: Partial<Warehouse>) => void;
	selectWarehouse: (warehouse: Partial<Warehouse>) => void;
}
interface PosProviderProps {
	children: ReactNode;
}
const PosContext = createContext<PosContextProps | undefined>(undefined);

export const PosProvider = ({ children }: PosProviderProps) => {
	const [selectedProducts, setSelectedProducts] = useState<Items[]>([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState<
		Partial<Warehouse>
	>({ code: 'CDO' } as Warehouse);
	const [warehouseProducts, setSelectWarehouseProducts] = useState<
		ProductPrices[]
	>([]);
	const [order, setOrder] = useState<CurrentOrder>({} as CurrentOrder);
	const { data: products } = useProductQuery();
	const { data: productInfo, isLoading } = useProductPricesQuery();

	/**
	 * Handles the quantity change for a selected product.
	 * @param {number} productId - The ID of the product.
	 * @param {number} newQuantity - The new quantity value.
	 * @param {number} maxQuantity - The maximum quantity allowed.
	 */
	const quantityHandler = (
		productId: number,
		newQuantity: number,
		maxQuantity: number,
	) => {
		if (newQuantity > 0 && newQuantity <= maxQuantity) {
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
		} else if (newQuantity === 0) {
			setSelectedProducts(prevSelectedProducts =>
				prevSelectedProducts.filter((_, index) => index !== productId),
			);
		}
	};

	/**
	 * Sets the selected warehouse and filters the product info based on the selected warehouse code.
	 * @param warehouse - The warehouse object containing the code of the selected warehouse.
	 */
	const setWarehouseProducts = (warehouse: Pick<Warehouse, 'code'>) => {
		setSelectWarehouseProducts(
			productInfo.filter(item => item.warehouse.code === warehouse.code),
		);
		return console.log('SETTING WAREHOUSE PRODUCTS:', warehouseProducts);
	};
	function selectWarehouse(warehouse: Partial<Warehouse>) {
		setSelectedWarehouse({ id: warehouse.id, code: warehouse.code });
		if (warehouse.code) {
			setWarehouseProducts({ code: warehouse.code });
		}
		return console.log('SELECTED WAREHOUSE:', warehouse);
	}
	useEffect(() => {
		if (isLoading) {
			setWarehouseProducts({ code: 'CDO' });
			console.log('Product INFO FETCH:');
		}
		setSelectedWarehouse({ id: 1, code: 'CDO' });
	}, []);

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
		warehouseProducts,
		setWarehouseProducts,
		selectedWarehouse,
		setSelectedWarehouse,
		selectWarehouse,
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
