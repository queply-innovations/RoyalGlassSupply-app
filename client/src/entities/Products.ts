export interface Product {
	id: number;
	product_name: string;
	product_id: number;
	serial_number: number;
	size: string;
	color: string;
	note: string;
	quantity: number;
	capital_price: number;
	markup_price: number;
	retail_price: number;
	approval_status: string;
	on_sale: string;
	sale_price: number;
	type: string;
}

export interface ProductData {
	data: any;
}
