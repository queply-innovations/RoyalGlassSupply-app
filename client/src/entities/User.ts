export interface User {
	id: number;
	username: string;
	password: string;
}

export interface UserRoles {
	id: number;
	userId: number;
	roleId: number;
}

export interface Roles {
	id: number;
	title: string;
}

export interface RolePermissions {
	id: number;
	roleId: number;
	permissionId: number;
}

export interface Permissions {
	id: number;
	title: string;
}

export interface UserData {
	data: unknown;
}
