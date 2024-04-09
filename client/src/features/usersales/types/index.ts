export interface User {
	id: number;
	username: string;
	email: string;
	firstname: string;
	lastname: string;
	position: string;
	contact_no: string;
}

export interface UserSales {
	id: number;
	invoices: Invoice[];
}

export interface Invoice {
	id: number;
	code: string;
	customer: {
		id: number;
		firstname: string;
		lastname: string;
	}
	warehouse: {
		id: number;
		code: string;
		name: string;
	}
	issued_by: {
		id: number;
		firstname: string;
		lastname: string;
	}
	type: string;
	payment_method: string;
	reference_no: string | null;
	subtotal: number;
	total_tax: number;
	total_discount: number;
	delivery_charge: number;
	total_amount_due: number;
	paid_amount: number;
	change_amount: number;
	or_no: string;
	created_at: string;
	updated_at: string;
	status: string;
}