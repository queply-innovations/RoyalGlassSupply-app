export interface User {
	id: number;
	username: string;
	password: string;
	email: string;
	firstname: string;
	lastname: string;
	position: string;
	contactNumber: string;
}

export interface UserResponse {
	user: User;
	token: string;
}

export interface Roles {
	id: number;
	title: string;
}

export interface RolePermissions {
	id: number;
	role_id: number;
	permission_id: number;
}

export interface Permissions {
	id: number;
	title: string;
}

export interface UserRole {
	id: number;
	user_id: User['id'];
	role_id: Roles['id'];
}

export interface UserWarehouses {
	id: number;
	user_id: number;
	warehouse_id: number;
}
