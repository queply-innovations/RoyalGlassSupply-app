export interface ReturnTransactions {
	id: number;
	code: string;
	invoice_id: number;
	issued_by: number;
	refundable_amount: number;
	voucher_id: number | null;
	refund_status: string;
	created_at: string;
	updated_at: string;
}

export interface ReturnTransactionsRaw {
	id: number;
	code: string;
	invoice: {
		id: number;
		code: string;
		customer: {
			id: number;
			firstname: string;
			lastname: string;
		};
		warehouse: {
			id: number;
			code: string;
			name: string;
		};
		type: string;
		payment_method: string;
		reference_no: string;
		total_amount_due: number;
		paid_amount: number;
		change_amount: number;
		or_no: string;
		status: string;
	};
	issued_by: {
		id: number;
		firstname: string;
		lastname: string;
		position: string;
	};
	refundable_amount: number;
	voucher: { id: number; code: string; notes: string; } | null;
	refund_status: string;
	created_at: string;
	updated_at: string;
}