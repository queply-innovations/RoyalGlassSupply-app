import { Warehouse } from '../../warehouse/__test__/types';
import { User } from '@/features/userinfo/types';
import { Product } from '@/features/product/__test__/types';

export interface Inventory {
	id: number;
	code: string;
	warehouse: Pick<Warehouse, 'id' | 'code' | 'name'>;
	created_by: Pick<User, 'id' | 'firstname' | 'lastname'>;
	date_received: string;
	type: 'supplier' | 'transfer';
	transfer_id: number | null;
	notes: string | null;
	created_at: string;
	updated_at: string | null;
}

export interface InventoryProduct {
  id: number;
  inventory_id: number;
  product: Pick<Product, 'id' | 'name' | 'size' | 'color'>;
  supplier_id: {id: number, name: string};
  capital_price: number;
  bundles_count: number;
  bundles_unit: string;
  quantity_per_bundle: number;
  stocks_count: number;
  damage_count: number;
  total_count: number;
  unit: string;
  transferred_stocks_count?: number;
  sold_count: number;
  miscellaneous_count?: number;
  remaining_stocks_count: number;
}