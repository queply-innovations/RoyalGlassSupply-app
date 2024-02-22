export interface User {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	position: string;
	contact_no: string;
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
