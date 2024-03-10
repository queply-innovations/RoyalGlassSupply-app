import { Warehouse } from '../../warehouse/__test__/types';
import { User } from '@/features/userinfo/types';

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
