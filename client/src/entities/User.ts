export interface User {
	id: number;
	username: string;
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	position: string;
	contactNumber: string;
}

export interface UserData {
	data: unknown;
}
