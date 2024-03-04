import storage from '@/utils/storage';

export const API_BASE_URL = 'http://127.0.0.1:8000/api';
// 'https://65956d2504335332df82b67a.mockapi.io/rgs/api';

export const API_URLS = {
	PRODUCTS: `${API_BASE_URL}/products`,
	PRODUCT_PRICES: `${API_BASE_URL}/product-prices`,
	USERS: `${API_BASE_URL}/users`,
	SUPPLIERS: `${API_BASE_URL}/suppliers`,
	USER_ROLES: `${API_BASE_URL}/user-roles`,
	ROLES: `${API_BASE_URL}/roles`,
	ROLE_PERMISSIONS: `${API_BASE_URL}/role_permissions`,
	PERMISSIONS: `${API_BASE_URL}/permissions`,
	LOGIN: `${API_BASE_URL}/login`,
	WAREHOUSE: `${API_BASE_URL}/warehouses`,
	INVOICE: `${API_BASE_URL}/invoices`,
	INVOICE_ITEMS: `${API_BASE_URL}/invoice-items`,
	INVOICE_DISCOUNTS: `${API_BASE_URL}/invoice-discounts`,
	INVOICE_TAXES: `${API_BASE_URL}/invoice-taxes`,
};

export const API_HEADERS = () => {
	return {
		Authorization: `Bearer ${storage.getToken()}`,
		'Content-Type': 'application/json',
	}
};