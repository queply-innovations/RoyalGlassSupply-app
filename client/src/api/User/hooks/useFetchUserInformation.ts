import { useQuery } from '@tanstack/react-query';
import fetchUser from '../Users';
import fetchRoles from '../../Role/Role';
import { fetchUserRoles } from '../../UserRole/UserRole';

export const useFetchUser = () => {
	return useQuery({
		queryKey: ['User'],
		queryFn: () => fetchUser(),
		refetchOnWindowFocus: false,
	});
};

export const useFetchRoles = () => {
	return useQuery({
		queryKey: ['Role'],
		queryFn: () => fetchRoles(),
		refetchOnWindowFocus: false,
	});
};

export const useFetchUserRoles = () => {
	return useQuery({
		queryKey: ['UserRoles'],
		queryFn: () => fetchUserRoles(),
		refetchOnWindowFocus: false,
	});
};
