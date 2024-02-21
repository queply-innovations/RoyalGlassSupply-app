export interface Product {
	id: number;
	name: string;
	serial_no: number;
	brand: string;
	size: string;
	color: string;
	notes: string;
}

export interface ProductPrices {
	id: number;
	product_id: number;
	product: Product;
	type: 'retail' | 'wholesale' | string;
	unit: string;
	stocks_quantity: number;
	stocks_unit: string;
	capital_price: number;
	markup_price: number;
	retail_price: number;
	tax_amount: number;
	cost: number;
	on_sale: number;
	sale_price: number;
	price: number;
	warehouse_id: number;
	created_by: number;
	approval_status: 'pending' | 'approved' | 'rejected' | string;
	approved_by: number;
	created_at: string;
	updated_at: string;
}
