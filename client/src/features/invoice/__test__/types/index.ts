import { User } from '@/features/auth';
import { Warehouse } from '@/features/warehouse/__test__/types';

export interface Invoices {
	id: number;
	code: string;
	customer_id: number;
	warehouse_id: Pick<Warehouse, 'id' | 'code' | 'name'>;
	issued_by: Pick<User, 'id' | 'firstname' | 'lastname'>;
	type: 'payment' | 'exit' | 'invoice' | string;
	payment_method: 'cash' | 'credit' | 'debit' | 'wallet' | 'cheque' | string; // what is wallet?
	reference_no: string;
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
}

export interface InvoiceItems {
	id: number;
	invoice_id: number;
	product_id: number;
	product_price_id: number;
	product_price: number;
	quantity: number;
	unit: string; //string or number?
	item_discount: number;
	discount_approval_status: string;
	approved_by: number;
	total_price: number;
	source_inventory: number;
}

export interface InvoiceTaxes {
	id: number;
	invoice_id: number;
	item: string;
	amount: number;
	notes: string;
}

export interface InvoiceDiscount {
	id: number;
	invoice_id: number;
	item: string;
	voucher_id: number;
	amount: number;
	discount_approval_status: string;
	approved_by: number;
	notes: string;
}

export interface InvoiceProps {
	invoice: Invoices[];
	invoiceItems: InvoiceItems[];
	invoiceTaxes: InvoiceTaxes[];
	invoiceDiscount: InvoiceDiscount[];
}
