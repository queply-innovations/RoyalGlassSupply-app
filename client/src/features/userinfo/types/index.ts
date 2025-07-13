export interface User {
	id: number;
	username: string;
	email: string;
	firstname: string;
	lastname: string;
	position: string;
	contact_no: string;
}

export interface UserAdd {
	id: number;
	username: string;
	email: string;
	firstname: string;
	lastname: string;
	role_id: number;
	contact_no: string;
	password: string;
	password_confirmation: string;
	active_status: string;
	position: string;
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
	id: number | null;
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
