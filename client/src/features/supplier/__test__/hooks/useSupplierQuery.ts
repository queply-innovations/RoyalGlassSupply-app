import { useQuery } from '@tanstack/react-query';
import { fetchSuppliers } from '../api/Supplier';

export const useSupplierQuery = () => {
	return useQuery({
		queryKey: ['supplier'],
		queryFn: () => fetchSuppliers(),
		refetchOnWindowFocus: false,
	});
};
