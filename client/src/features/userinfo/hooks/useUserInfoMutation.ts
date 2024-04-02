import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addUser, editUser,
} from '../api/UserInfo';
import { useUserInfo } from '../context/UserInfoContext';
import { useState, ChangeEvent, useEffect } from 'react';
import { Roles, User } from '../types';

export const useUserInfoMutation = (selectedUser: User, roles: any) => {
	const queryClient = useQueryClient();

	const [ user, setUser ] = useState({
		firstname: selectedUser.firstname,
		lastname: selectedUser.lastname,
		username: selectedUser.username,
		email: selectedUser.email,
		contact_no: selectedUser.contact_no,
		position: selectedUser.position,
		user_id: selectedUser.id,
		role_id: 0,
	});

	useEffect(() => {
		if (roles){
			setUser(prev => ({
				...prev,
				role_id: roles.find((role: Roles) => role.title === selectedUser.position)?.id,
			}));
		}
	}, [roles]);

	// const [ roleId, setRoleId ] = useState(roles.find((role: Roles) => role.title === selectedUser.position)?.id);

	const [ isChanged, setIsChanged ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);

	const handleChangeSelect = (
		key: string,
		_value: any,
	) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		setUser(prev => ({
			...prev,
			[key]: _value,
		}));
	};

	const handleChange = (e: any) => {
		setIsChanged(true);
		setSuccess(null);
		setUser(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		if (e.target.name === 'position') {
			setUser(prev => ({
				...prev,
				role_id: roles.find((role: Roles) => role.title === e.target.value)?.id,
			}));
		}
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		if (user.contact_no?.length > 11 || user.contact_no?.length < 11) {
			setError('Contact number must be 11 digits');
			setIsSubmitting(false);
		} else {
			return await editUserMutation(user);
		}
	};

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['users'] });
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

	const { mutateAsync: editUserMutation } = useMutation({
		mutationKey: ['editUser'],
		mutationFn: editUser,
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
		handleChangeSelect,
		handleChange,
		editUserMutation,
	};
};