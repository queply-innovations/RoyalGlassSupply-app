import { InvoiceItemDatabase } from '@/features/invoice/__test__/types';
import {
	ProductPrices,
	ProductPricesPOS,
} from '@/features/product/__test__/types';
import { ReactNode } from 'react';

// TODO: Separate to another file? Also verify the values based on the database?
export type Role =
	| 'super_admin'
	| 'admin'
	| 'manager'
	| 'encoder'
	| 'sales_person';

export interface NavbarRoute {
	path?: string;
	child?: NavbarRoute[];
	allowedRoles: Role[];
	navbarProps?: {
		displayText: string;
		icon?: ReactNode;
	};
}

export interface Products {
	product: Pick<
		ProductPrices,
		'product' | 'id' | 'stocks_unit' | 'type' | 'unit'
	>;
}

export interface Items {
	product: Partial<ProductPrices>;
	quantity: number;
	price: number;
	name: string;
	type: string;
	subtotal: number;
}

export interface CurrentOrder {
	items: Items[];
	totalItems: number;
	totalAmount: number;
}

export interface Customer {
	id: number;
	firstname: string;
	lastname: string;
	address: string;
	contact_no: number;
	total_credit: number;
	total_balance: number;
}

export interface CartItem extends InvoiceItemDatabase {
	item: ProductPricesPOS;
}
