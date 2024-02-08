import { useQuery } from '@tanstack/react-query';
import { fetchWarehouses } from '../api/Warehouse';

export const useWarehouseQuery = () => {
	return useQuery({
		queryKey: ['warehouses'],
		queryFn: () => fetchWarehouses(),
		refetchOnWindowFocus: false,
	});
};
