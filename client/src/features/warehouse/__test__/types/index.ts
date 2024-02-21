export interface Warehouse {
	id: number;
	code: string;
	name: string;
	location: string;
}

export interface WarehouseData {
	isUpdate?: boolean;
}
