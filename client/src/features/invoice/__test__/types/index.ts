import { InventoryProduct } from '@/features/inventory/types';
import { Customer } from '@/features/pos/__test__/types';
import { Product } from '@/features/product/__test__/types';

export interface Invoices {
	balance_amount: number;
	is_paid: number;
	id: number;
	code: string;
	warehouse_id: number;
	issued_by: number;
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
	status: string;
	customer: Customer;
}
export interface InvoiceItemDatabase {
	product_id: number;
	product_price_id: number;
	product_price: number;
	quantity: number;
	unit: string;
	item_discount: number;
	discount_approval_status: string | null;
	approved_by: number | null;
	total_price: number;
	source_inventory: number;
}

export interface InvoiceItems {
	id: number;
	invoice_id: number | null | undefined;
	product: Partial<Product>;
	product_price_id: number;
	product_price: number;
	quantity: number;
	unit: string; //string or number?
	item_discount: number;
	discount_approval_status: string | null;
	approved_by: number | null;
	total_price: number;
	source_inventory: number;
	inventory_product?: InventoryProduct;
}

export interface ReturnInvoiceDatabase extends Invoices {
	invoice_items: InvoiceItems[];
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

export interface ReturnInvoice {
	code: string;
	invoice_id: number;
	issued_by: number;
	refundable_amount: number;
	refund_status: string;
	return_items: ReturnInvoiceItems[];
	is_cash_refund: number;
}

export interface ReturnInvoiceItems {
	return_transaction_id?: number;
	invoice_item_id: number;
	quantity: number;
	unit: string;
	price: number;
	reason: string;
}
