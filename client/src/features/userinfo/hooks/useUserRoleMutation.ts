import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	addPermissions,
	addUser, editUser, fetchPermissions, getPermissions, removePermissions,
} from '../api/UserInfo';
import { useUserInfo } from '../context/UserInfoContext';
import { useState, ChangeEvent, useEffect } from 'react';
import { RolePermissions, Permissions, Roles, User } from '../types';

export const useUserRoleMutation = () => {
	const queryClient = useQueryClient();

	const { roles, selectedUser } = useUserInfo();
	const roleId = roles.filter((role: Roles) => role.title === selectedUser.position);

	const [permissions, setPermissions] = useState<RolePermissions[]>([]); //current permissions of role
	const [allPermissions, setAllPermissions] = useState<Permissions[]>([]); //all possible permissions
	const [permissionChange, setPermissionChange] = useState<RolePermissions[]>([]); //permissions to be changed

	const { data: allPermissionQuery } = useQuery({
		queryKey: ['all-permissions'],
		queryFn: () => fetchPermissions(),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		const allPermissions = allPermissionQuery;
		if (allPermissions) {
			setAllPermissions(allPermissions);
		}
	}, [allPermissionQuery]);

	const { isFetching, data: permissionQuery } = useQuery({
		queryKey: ['permissions'],
		queryFn: () => getPermissions(roleId[0].id),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		const permissions = permissionQuery;
		if (permissions) {
			setPermissions(permissions);
			setPermissionChange(permissions);
		}
	}, [permissionQuery]);

	const [ isChanged, setIsChanged ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);

	const handleChange = (checked: boolean, perm_id: number) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		if (!checked) {
			setPermissionChange(
				permissionChange.filter(
					permission => permission.permission_id !== perm_id,
				),
			);
		} else {
			setPermissionChange([
				...permissionChange,
				{
					id: null,
					role_id: roleId,
					permission_id: perm_id,
				},
			]);
		}
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		if (permissionChange.length > permissions.length) { //added permissions
			const addedPermissions = permissionChange.filter((permission) => permission.id === null);
			if (addedPermissions.length > 1) {
				addedPermissions.forEach(async (permission) => {
					await addRolePermission(permission);
				});
			} else {
				return await addRolePermission(addedPermissions);
			}
		} else if (permissionChange.length < permissions.length) { //removed permissions
			const removedPermissions = permissions.filter((permission) => permissionChange.find((p) => p.permission_id === permission.permission_id) === undefined);
			if (removedPermissions.length > 1) {
				removedPermissions.forEach(async (permission) => {
					await deleteRolePermission(permission);
				});
			} else {
				return await deleteRolePermission(removedPermissions[0]);
			}
		} else { //no changes
			setIsSubmitting(false);
			setIsChanged(false);
			setSuccess('No changes made');
		}
	};

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['all-permissions'] });
			setIsSubmitting(false);
			setIsChanged(false);
			setSuccess('Role permissions have been updated');
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: addRolePermission } = useMutation({
		mutationKey: ['addpermission'],
		mutationFn: addPermissions,
		...mutationConfig,
	});

	const { mutateAsync: deleteRolePermission } = useMutation({
		mutationKey: ['deletepermission'],
		mutationFn: removePermissions,
		...mutationConfig,
	});

	return {
		// value,
		// setValue,
		permissions,
		allPermissions,
		permissionChange,
		isChanged,
		isSubmitting,
		error,
		success,
		handleSubmit,
		handleChange,
	};
};