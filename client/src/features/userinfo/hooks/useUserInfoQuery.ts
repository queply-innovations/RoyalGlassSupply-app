import { useQuery } from '@tanstack/react-query';
import { fetchUsers, getRoles } from '../api/UserInfo';
import { useEffect, useState } from 'react';
import { Roles, User } from '../types';

// Custom hook for fetching and managing user info data
export const useUserInfoQuery = () => {
	// State to store user info data
	const [users, setUsers] = useState<User[]>([]);
	const [roles, setRoles] = useState<Roles[]>([]);

	const [progress, setProgress] = useState(0);

	// Query for fetching user info data
	const { isFetching, data: userQuery } = useQuery({
		// Key for identifying this query
		queryKey: ['users'],
		// Function to fetch user info data
		queryFn: () => fetchUsers(setProgress),
		// Disable refetching
		refetchOnWindowFocus: false,
	});

	// Query for fetching roles data
	const { data: roleQuery } = useQuery({
		// Key for identifying this query
		queryKey: ['roles'],
		// Function to fetch roles data
		queryFn: () => getRoles(),
		// Disable refetching
		refetchOnWindowFocus: false,
	});

	// Effect to update state when user info query changes
	useEffect(() => {
		// Destructure data from userQuery object
		const users = userQuery;
		if (users) {
			// Update state with fetched user info data
			setUsers(users);
		}
		// Dependency array to trigger effect when userQuery changes
	}, [userQuery]);

	// Effect to update state when role query changes
	useEffect(() => {
		// Destructure data from roleQuery object
		const roles = roleQuery;
		if (roles) {
			// Update state with fetched role data
			setRoles(roles);
		}
		// Dependency array to trigger effect when roleQuery changes
	}, [roleQuery]);

	// Return state and query object
	return { users, userQuery, isFetching, progress, roles };
};
