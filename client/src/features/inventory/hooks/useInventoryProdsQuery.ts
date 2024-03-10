import { useQuery } from '@tanstack/react-query';
import {
	fetchInventoryProducts,
	fetchInventoryProductById,
} from '../api/Inventory';

export const useInventoryProductsQuery = () => {
	const { data, isFetching: isLoading } = useQuery({
		queryKey: ['inventoryProducts'],
		queryFn: () => fetchInventoryProducts(),
		refetchOnWindowFocus: false,
	});

	return { data, isLoading };
};

export const useInventoryProductByIdQuery = (inventory_id: number) => {
	const { data, isFetching: isLoading } = useQuery({
		queryKey: ['inventoryProductById', inventory_id],
		queryFn: () => fetchInventoryProductById(inventory_id),
		refetchOnWindowFocus: false,
	});
	return { data, isLoading };
};
