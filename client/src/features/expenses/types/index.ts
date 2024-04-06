export interface Expenses {
	id: number;
	title: string;
	date_of_operation: string;
	amount: number;
	notes: string;
	created_by: number;
	created_at: string;
	updated_at: string;
}

export interface ExpensesRaw {
	id: number;
	title: string;
	date_of_operation: string;
	amount: number;
	notes: string;
	created_by: {
		id: number;
		username: string;
		email: string;
		email_verified_at: string;
		firstname: string;
		lastname: string;
		position: string;
		contact_no: string;
		active_status: string;
		created_at: string;
		updated_at: string;
	}
	created_at: number;
	updated_at: number;
}