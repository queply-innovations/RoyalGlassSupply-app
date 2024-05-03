import { Product } from '@/features/product/__test__/types';

export interface Reports {
	date_from: string;
	date_to: string;
	total_sales: number;
	total_capital: number;
	total_expenses: number;
	total_profit: number;
	total_collectibles: number;
	new_customers: number;
	returning_customers: number;
}

export interface ReportAnalytics {
	Month: string;
	date_from: string;
	date_to: string;
	gross_income: number;
	capital: number;
	expenses: number;
	net_profit: number;
	collectibles: number;
}

export interface TopSellingProducts {
	product_id: number;
	sold_count: number;
	stocks_unit: string;
	product: Omit<Product, 'notes'>;
}

export interface InventoryLevelReport {
	[inventoryCode: string]: {
		[productName: string]: string;
	};
}
