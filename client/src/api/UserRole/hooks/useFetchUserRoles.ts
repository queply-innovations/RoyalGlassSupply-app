import { useQuery } from '@tanstack/react-query';
import { fetchUserRoles } from '../UserRole';

export const useFetchUserRoles = () => {
	return useQuery({
		queryKey: ['UserRoles'],
		queryFn: () => fetchUserRoles(),
		refetchOnWindowFocus: false,
	});
};
