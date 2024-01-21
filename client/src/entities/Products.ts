export interface Product {
	id: number;
	name: string;
	serial_number: number;
	size: string;
	color: string;
	notes: string;
}

export interface ProductPrices {
	id: number;
	product_id: number;
	type: 'single' | 'bundle' | string;
	quantity: number;
	unit: string;
	capital_price: number;
	markup_price: number;
	retail_price: number;
	on_sale: boolean;
	sale_price: number;
	warehouse_id: number;
	created_by: number;
	approval_status: 'pending' | 'approved' | 'rejected' | string;
	approved_by: number;
	active_status: 'active' | 'inactive' | string;
	created_at: string;
	updated_at: string;
}

export interface ProductData {
	data: any;
}
