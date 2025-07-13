import { useQuery } from '@tanstack/react-query';
import { fetchUserRoles } from '../UserRole';

export const useFetchUserRoles = (id: number) => {
	return useQuery({
		queryKey: ['UserRoles'],
		queryFn: () => fetchUserRoles(id),
		refetchOnWindowFocus: false,
	});
};
