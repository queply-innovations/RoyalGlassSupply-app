import { useQuery } from '@tanstack/react-query';
import {
	fetchInventoryProducts,
	fetchInventoryProductById,
	fetchInventoryProductByWarehouseId,
} from '../api/Inventory';
import { useEffect, useState } from 'react';
import { InventoryProduct } from '../types';

export const useInventoryProductsQuery = () => {
	// State of the response data
	const [data, setData] = useState<InventoryProduct[]>(
		[] as InventoryProduct[],
	);

	// Query for fetching inventory products and isLoading state
	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['inventoryProducts'],
		queryFn: () => fetchInventoryProducts(),
		refetchOnWindowFocus: false,
	});

	// Update states when query results changes [result, isLoading]
	useEffect(() => {
		if (!isLoading && result) {
			setData(result);
		}
	}, [result, isLoading]);

	return { data, isLoading };
};

export const useInventoryProductWarehouseQuery = (warehouse_id: number) => {
	// State of the response data
	const [data, setData] = useState<InventoryProduct[]>(
		[] as InventoryProduct[],
	);

	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['inventoryProductWarehouse', warehouse_id],
		queryFn: () => fetchInventoryProductByWarehouseId(warehouse_id),
		refetchOnWindowFocus: false,
	});

	// Update states when query results changes [result, isLoading]
	useEffect(() => {
		if (!isLoading && result) {
			setData(result);
		}
	}, [result, isLoading]);

	return { data, isLoading };
};

export const useInventoryProductByIdQuery = (inventory_id: number) => {
	// State of the response data
	const [data, setData] = useState<InventoryProduct[]>(
		[] as InventoryProduct[],
	);

	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['inventoryProductById', inventory_id],
		queryFn: () => fetchInventoryProductById(inventory_id),
		refetchOnWindowFocus: false,
	});

	// Update states when query results changes [result, isLoading]
	useEffect(() => {
		if (!isLoading && result) {
			setData(result);
		}
	}, [result, isLoading]);

	return { data, isLoading };
};
