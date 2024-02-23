import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addUser,
} from '../api/UserInfo';
import { useUserInfo } from '../context/UserInfoContext';
import { useState, ChangeEvent } from 'react';
import { User } from '@/entities';

export const useUserInfoMutation = () => {
	const queryClient = useQueryClient();
	const user = useUserInfo();

	// State to store warehouse form data
	const [value, setValue] = useState<User>({
		id: user.length + 1 || 0,
		username: '',
		password: '',
		email: '',
		firstName: '',
		lastName: '',
		position: '',
		contactNumber: '',
	} as User);

	// Function to handle form input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValue(prevUserForm => ({
			...(prevUserForm as User),
			[name]: value,
		}));
	};

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['user'] });
			// Reset form data
			setValue({
				id: user.length + 1 || 0,
				username: '',
				password: '',
				email: '',
				firstName: '',
				lastName: '',
				position: '',
				contactNumber: '',
			} as User);
		},
		onError: (error: any) => {
			console.error('User Data failed', error);
		},
	};

	// const { mutateAsync: removeWarehouseMutation } = useMutation({
	// 	mutationKey: ['removeWarehouse'],
	// 	// * This function will call removeWarehouse from API to remove the warehouse
	// 	mutationFn: removeWarehouse,
	// 	...mutationConfig,
	// });

	const { mutateAsync: addUserMutation } = useMutation({
		mutationKey: ['addUser'],
		// * This function will call addWarehouse from API to add the warehouse
		mutationFn: addUser,
		...mutationConfig,
	});

	// const { mutateAsync: updateWarehouseMutation } = useMutation({
	// 	mutationKey: ['updateWarehouse'],
	// 	// * This function will call updateWarehouse from API to update the warehouse
	// 	mutationFn: updateWarehouse,
	// 	...mutationConfig,
	// });

	return {
		value,
		setValue,
		handleChange,
		addUserMutation,
	};
};
