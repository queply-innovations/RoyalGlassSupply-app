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
