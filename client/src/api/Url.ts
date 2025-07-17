import storage from '@/utils/storage';

export const API_BASE_URL = 'https://royalglasssupply.com/api';
// export const API_BASE_URL = 'http://localhost:8000/api';

export const API_URLS = {
	PRODUCTS: `${API_BASE_URL}/products`,
	PRODUCT_PRICES: `${API_BASE_URL}/product-prices`,
	USERS: `${API_BASE_URL}/users`,
	USER_ROLES: `${API_BASE_URL}/user-roles`,
	USER_WAREHOUSES: `${API_BASE_URL}/user-warehouses`,
	SUPPLIERS: `${API_BASE_URL}/suppliers`,
	REGISTER: `${API_BASE_URL}/register`,
	ROLES: `${API_BASE_URL}/roles`,
	ROLE_PERMISSIONS: `${API_BASE_URL}/role-permissions`,
	PERMISSIONS: `${API_BASE_URL}/permissions`,
	LOGIN: `${API_BASE_URL}/login`,
	WAREHOUSE: `${API_BASE_URL}/warehouses`,
	INVENTORY: `${API_BASE_URL}/inventories`,
	INVENTORY_PRODUCTS: `${API_BASE_URL}/inventory-products`,
	INVOICE: `${API_BASE_URL}/invoices`,
	INVOICE_ITEMS: `${API_BASE_URL}/invoice-items`,
	INVOICE_DISCOUNTS: `${API_BASE_URL}/invoice-discounts`,
	INVOICE_TAXES: `${API_BASE_URL}/invoice-taxes`,
	TRANSACTION: `${API_BASE_URL}/transaction`,
	TRANSFER: `${API_BASE_URL}/transfers`,
	TRANSFER_PRODUCTS: `${API_BASE_URL}/transfer-products`,
	CUSTOMERS: `${API_BASE_URL}/customers`,
	EXPENSES: `${API_BASE_URL}/operation_expenses`,
	RETURN_TRANSACTIONS: `${API_BASE_URL}/return-transactions`,
	RETURN_TRANSACTIONS_ITEMS: `${API_BASE_URL}/return-transaction-items`,
	REPORTS: `${API_BASE_URL}/reports`,
	VOUCHERS: `${API_BASE_URL}/vouchers`,
};

export const API_HEADERS = () => {
	return {
		Authorization: `Bearer ${storage.getToken()}`,
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'ngrok-skip-browser-warning': true,
	};
};
