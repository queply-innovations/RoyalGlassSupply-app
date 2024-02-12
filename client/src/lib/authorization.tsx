// import { useUserContext } from '@/features/auth/context/AuthContext';
import { Roles } from '@/features/auth/types';
import { useCallback } from 'react';

export enum ROLES {
	SUPER_ADMIN = 'SUPER_ADMIN',
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	ENCODER = 'ENCODER',
	SALES_PERSON = 'SALES_PERSON',
}

type RoleTypes = keyof typeof ROLES;

const hasPermissions = (role: Roles, condition: () => boolean) => condition();
export const POLICIES = {
	manage_users: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	modify_access_users: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	modify_users: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	add_product: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	update_product: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	delete_product: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	add_catalog: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	approve_catalog: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	add_transfer_products: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	confirm_transfer_products: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	add_return_products: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	confirm_return_products: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	add_orders: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	view_users_tab: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	view_finances_tab: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	view_transfers_tab: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	view_transactions_tab: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	view_pending_tab: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	view_warehouse_tab: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	view_supplier_tab: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
	view_products_tab: (role: Roles) =>
		hasPermissions(
			role,
			() => role.title === ROLES.SUPER_ADMIN || role.title === ROLES.ADMIN,
		),
};

// export const useAuthorization = () => {
// 	const user = useUserContext();

// 	if (!user) {
// 		throw Error('User does not exist!');
// 	}
// 	const checkAccess = useCallback(
// 		({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
// 			if (allowedRoles && allowedRoles.length > 0) {
// 				return allowedRoles?.includes(user.title as RoleTypes);
// 			}

// 			return true;
// 		},
// 		[user.title],
// 	);

// 	return { checkAccess, role: user.title };
// };
