import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addUser, editUser,
} from '../api/UserInfo';
import { useUserInfo } from '../context/UserInfoContext';
import { useState, ChangeEvent } from 'react';
import { Roles, User } from '../types';

export const useUserInfoAddition = () => {
	const queryClient = useQueryClient();

	const [ user, setUser ] = useState({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		contact_no: '',
		position: '',
		id: 0,
	});

	// const [ roleId, setRoleId ] = useState(roles.find((role: Roles) => role.title === selectedUser.position)?.id);

	const [ isChanged, setIsChanged ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);

	const handleChange = (e: any) => {
		setIsChanged(true);
		setSuccess(null);
		setUser(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		return await addUserMutation(user);
	};

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['user'] });
			setIsSubmitting(false);
			setIsChanged(false);
			setSuccess('User info has been updated');
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: addUserMutation } = useMutation({
		mutationKey: ['addUser'],
		mutationFn: addUser,
		...mutationConfig,
	});

	return {
		// value,
		// setValue,
		user,
		isChanged,
		isSubmitting,
		error,
		success,
		handleSubmit,
		handleChange,
		addUserMutation,
	};
};