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
export interface ProductPrices {
	id: number;
	product: Partial<Product>;
	type: 'retail' | 'wholesale' | string;
	unit: string;
	stocks_quantity: number;
	stocks_unit: string;
	capital_price: number;
	markup_price: number;
	tax_amount: number; // remove when removed from database, its currently NOT NULL
	cost: number;
	on_sale: number;
	sale_discount: number;
	price: number;
	warehouse: Pick<Warehouse, 'id' | 'code' | 'name'>;
	created_by: ProductEditor;
	approval_status: 'pending' | 'approved' | 'rejected' | string;
	approved_by: ProductEditor;
	active_status: 'active' | 'inactive' | string;
	created_at: string;
	updated_at: string;
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
