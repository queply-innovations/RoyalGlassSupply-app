import { InventoryProduct } from '@/features/inventory/types';
import { Warehouse } from '@/features/warehouse/__test__/types';

export interface Product {
	id: number;
	name: string;
	serial_no: string;
	brand: string;
	size: string;
	color: string;
	notes: string;
}

interface ProductEditor {
	id: number;
	firstname: string;
	lastname: string;
}

// TODO refactor
export interface ProductPrices {
	id: number;
	product: Omit<Product, 'notes'>;
	inventory_product: InventoryProduct;
	// type: 'retail' | 'wholesale' | string; // walaon
	// unit: string; // walaon
	capital_price: number;
	markup_price: number;
	cost: number;
	on_sale: number;
	sale_discount: number;
	price: number;
	warehouse: Pick<Warehouse, 'id' | 'code' | 'name'>;
	created_by: ProductEditor;
	approval_status: 'pending' | 'approved' | 'rejected' | string;
	approved_by: ProductEditor | null;
	active_status: 'active' | 'inactive' | string;
	created_at: string;
	updated_at: string;
}

export interface ProductPricesPOS {
	id: number;
	product_id: number;
	type: string;
	unit: string;
	stocks_quantity: number;
	stocks_unit: string;
	capital_price: number;
	markup_price: number;
	tax_amount: number;
	cost: number;
	on_sale: number;
	sale_discount: number;
	price: number;
	warehouse_id: number;
	created_by: ProductEditor;
	approval_status: string;
	approved_by: ProductEditor | number | null;
	active_status: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	product: Omit<Product, 'notes'>;
	warehouse: Warehouse;
	inventory_product: InventoryProduct;
}

export interface ProductPricesDatabase
	extends Omit<
		ProductPrices,
		'product' | 'warehouse' | 'approved_by' | 'created_by'
	> {
	product_id: number;
	warehouse_id: number;
	created_by: number;
	approved_by: number;
}

export interface ProductPricesPaginated {
	data: ProductPricesPOS[]; // product prices data
	path: string; // url path
	to: number; // last index of current page
	from: number; // first index of current page
	per_page: number; // number of items per page
	last_page: number; // last page number
	total: number; // total number of items
	current_page: number; // current page number (non index-based)
	next_page_url: string | null; // url of next page
	prev_page_url: string | null; // url of previous page
	first_page_url: string; // url of first page
	last_page_url: string; // url of last page
	links: Array<{ active: boolean; label: string; url: string | null }>; // pagination links
}
