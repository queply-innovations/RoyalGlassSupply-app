import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/api/User/Users';
import { fetchRoles } from '@/api/Role/Roles';
import { fetchRolePermissions } from '@/api/RolePermissions/RolePermissions';
import { fetchUserRoles } from '@/api/UserRole/UserRole';
import {
	User,
	UserRoles,
	Roles,
	RolePermissions,
	Permissions,
} from '@/entities';
import { fetchPermissions } from '@/api/Permissions/Permissions';

const joinUserInformation = async (): Promise<{
	user: User[];
	user_roles: UserRoles[];
	roles: Roles[];
	role_permissions: RolePermissions[];
	permissions: Permissions[];
}> => {
	try {
		const userPromise = fetchUser();
		const userRolesPromise = fetchUserRoles();
		const rolesPromise = fetchRoles();
		const rolePermissionPromise = fetchRolePermissions();
		const permissionsPromise = fetchPermissions();

		const [user, user_roles, roles, role_permissions, permissions] =
			await Promise.all([
				userPromise,
				userRolesPromise,
				rolesPromise,
				rolePermissionPromise,
				permissionsPromise,
			]);

		return { user, user_roles, roles, role_permissions, permissions };
	} catch (error) {
		console.error('Error fetching user information:', error);
		throw error;
	}
};

const combineUserInformation = async () => {
	try {
		const { user, user_roles, roles, role_permissions, permissions } =
			await joinUserInformation();

		const combinedArray = user.map(user => {
			const userId = user.id.toString();
			const userRoles = user_roles.find(
				user_roles => user_roles.userId.toString() === userId,
			);
			const roleId = roles.find(
				roles => roles.id.toString() === userRoles?.roleId.toString(),
			);
			const userRolePermissions = role_permissions.find(
				role_permissions =>
					role_permissions.roleId.toString() === roleId?.id.toString(),
			);
			const userPermissions = permissions.find(
				permission => permission.id === userRolePermissions?.permissionId,
			);
			return {
				...user,
				userRoles,
				roleId,
				userRolePermissions,
				userPermissions,
			};
		});
		console.log('Combined Array:', combinedArray);
		return combinedArray;
	} catch (error) {
		console.error('Error fetching user information:', error);
		throw error;
	}
};
export const useFetchUserInformation = () => {
	return useQuery({
		queryKey: ['UserInformation'],
		queryFn: () => combineUserInformation(),
		refetchOnWindowFocus: false,
	});
};
