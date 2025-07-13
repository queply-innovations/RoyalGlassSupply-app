export interface User {
	id: number;
	username: string;
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	position: string;
	contact_no: string;
}

export interface UserData {
	data: unknown;
}
