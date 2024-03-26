import { StringValidation } from "zod";

export interface Transfer {
	id: number;
	code: string;
	created_by: {
		id: number;
		firstname: string;
		lastname: string;
	}
	source: {
		id: number;
		code: string;
		name: string;
	}
	destination: {
		id: number;
		code: string;
		name: string;
	}
	transfer_schedule: string;
	approval_status: string;
	approved_by: {
		id: number;
		firstname: string;
		lastname: string;
	}
	transfer_status: string;
	date_received: string;
	received_by: {
		id: number;
		firstname: string;
		lastname: string;
	}
	created_at: string;
	updated_at: string;
	notes: string;
}

export interface TransferAdd {
	code: string;
	created_by: number;
	source: number;
	destination: number;
	approval_status: string;
	transfer_schedule: string;
	notes: string;
}

export interface TransferEdit {
	id: number;
	code: string;
	created_by: number;
	source: number;
	destination: number;
	transfer_schedule: string;
	approval_status: string;
	approved_by: number | null;
	transfer_status: string | null;
	date_received: string | null;
	received_by: number | null;
	notes: string;
}

export interface TransferProductFull {
	id: number;
	transfer_id: number;
	product: {
		color: string;
		id: number;
		name: string;
		size: string;
	};
	capital_price: number;
	bundles_count: number;
	bundles_unit: string;
	quantity_per_bundle: number;
	total_quantity: number;
	unit: string;
	source_inventory: number;
}

export interface TransferProduct {
	id: number;
	transfer_id: number;
	product_id: number;
	capital_price: number;
	bundles_count: number;
	bundles_unit: string;
	quantity_per_bundle: number;
	total_quantity: number;
	unit: string;
	source_inventory: number;
}

export interface Inventory {
	code: string;
	warehouse_id: number;
	created_by: number;
	date_received: string | null;
	type: 'transfer';
	transfer_id: number;
	notes: string;
}