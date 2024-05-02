import { InvoiceItems, Invoices } from '@/features/invoice/__test__/types';
import { User } from '@/features/userinfo/types';

export interface ReturnTransactions {
	id: number;
	code: string;
	invoice: Invoices;
	issued_by: Pick<User, 'id' | 'firstname' | 'lastname'>;
	refundable_amount: number;
	voucher?: string;
	refund_status: string;
	created_at: string;
	updated_at: string;
}

export interface ReturnItems {
	id: number;
	return_transaction_id: number;
	invoice_item: InvoiceItems;
	quantity: number;
	unit: string;
	price: number;
	reason: string;
}
