export interface Customer {
	id: number;
	firstname: string;
	lastname: string;
	address: string;
	contact_no: number;
	total_credit: number;
	total_balance: number;
}

export interface Voucher {
	id: number;
	code: string;
	customer_id: number;
	return_transaction_id: number;
	discounted_price: number;
	is_claimed: number;
	generated_by: number;
	notes: string;
	created_at: string;
	updated_at: string;
}
