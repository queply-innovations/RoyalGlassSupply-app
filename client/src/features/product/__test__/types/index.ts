import { Warehouse } from '@/features/warehouse/__test__/types';
import { BluetoothPairingHandlerHandlerDetails } from 'electron';

export interface Product {
	id: number;
	name: string;
	serial_no: number;
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
	product_id: number;
	product: Product;
	type: 'retail' | 'wholesale' | string;
	unit: string;
	quantity: number;
	stocks_unit: string;
	capital_price: number;
	markup_price: number;
	retail_price: number;
	tax_amount: number;
	cost: number;
	on_sale: number;
	sale_price: number;
	price: number;
	warehouse: Pick<Warehouse, 'id'| 'name'>;
	created_by: ProductEditor;
	approval_status: 'pending' | 'approved' | 'rejected' | string;
	approved_by: ProductEditor;
	created_at: string;
	updated_at: string;
	active_status: 'active' | 'inactive' | string;
}
