import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/UserInfo';
import { useEffect, useState } from 'react';
import { User } from '../types';

// Custom hook for fetching and managing user info data
export const useUserInfoQuery = () => {
	// State to store user info data
	const [users, setUsers] = useState<User[]>([]);

	// Query for fetching user info data
	const userQuery = useQuery({
		// Key for identifying this query
		queryKey: ['users'],
		// Function to fetch user info data
		queryFn: () => fetchUsers(),
		// Disable refetching
		refetchOnWindowFocus: false,
	});

	// Effect to update state when user info query changes
	useEffect(() => {
		// Destructure data from userQuery object
		const { data: users } = userQuery;
		if (users) {
			// Update state with fetched user info data
			setUsers(users);
		}
		// Dependency array to trigger effect when userQuery changes
	}, [userQuery]);

	// Return state and query object
	return { users, userQuery };
};
