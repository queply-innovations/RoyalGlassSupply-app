import { createContext, useContext, useState } from 'react';
import { ProductPricesPaginated, ProductPricesPOS } from '../types';
import { useProductPricesPaginatedQuery } from '../hooks';
import { PaginationState, SortingState } from '@tanstack/react-table';

interface ProductPricesPaginatedContextProps {
	data: ProductPricesPaginated | undefined;
	isLoading: boolean;
	isFetching: boolean;

	pagination: PaginationState;
	setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;

	warehouse_id: number | null;
	setWarehouseId: React.Dispatch<React.SetStateAction<number | null>>;

	sorting: SortingState;
	setSorting: React.Dispatch<React.SetStateAction<SortingState>>;

	productQuery: string | null;
	setProductQuery: React.Dispatch<React.SetStateAction<string | null>>;

	selectedProductPrice: ProductPricesPOS | undefined;
	setSelectedProductPrice: React.Dispatch<
		React.SetStateAction<ProductPricesPOS | undefined>
	>;
}

const ProductPricesPaginatedContext =
	createContext<ProductPricesPaginatedContextProps | null>(null);

interface ProductPricesPaginatedProviderProps {
	children: React.ReactNode;
}

export const ProductPricesPaginatedProvider = ({
	children,
}: ProductPricesPaginatedProviderProps) => {
	const [selectedProductPrice, setSelectedProductPrice] = useState<
		ProductPricesPOS | undefined
	>(undefined);

	const [pagination, setPagination] = useState({
		pageIndex: 0, // 0-based index
		pageSize: 25,
	});

	const [warehouse_id, setWarehouseId] = useState<number | null>(null);
	const [sorting, setSorting] = useState<SortingState>([
		{ id: 'created_at', desc: true },
	]);

	const [productQuery, setProductQuery] = useState<string | null>(null);

	const { data, isFetching, isLoading } = useProductPricesPaginatedQuery({
		pagination: {
			page: pagination.pageIndex + 1,
			pageSize: pagination.pageSize,
		},
		...(warehouse_id && { filter: { warehouse_id } }),
		...(sorting.length > 0 && {
			sort: {
				[sorting[0].id]: sorting[0].desc ? 'desc' : 'asc',
			},
		}),
		...(productQuery && { search: { product_name: productQuery } }),
	});

	const value = {
		data,
		isLoading,
		isFetching,

		pagination,
		setPagination,

		warehouse_id,
		setWarehouseId,

		sorting,
		setSorting,

		productQuery,
		setProductQuery,

		selectedProductPrice,
		setSelectedProductPrice,
	};

	return (
		<ProductPricesPaginatedContext.Provider value={value}>
			{children}
		</ProductPricesPaginatedContext.Provider>
	);
};

export const useProductPricesPaginated = () => {
	const context = useContext(ProductPricesPaginatedContext);
	if (!context) {
		throw new Error(
			'useProductPricesPaginated must be used within ProductPricesPaginatedProvider',
		);
	}
	return context;
};
