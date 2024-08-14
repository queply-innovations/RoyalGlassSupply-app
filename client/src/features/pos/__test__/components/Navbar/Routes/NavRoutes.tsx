import {
	Banknote,
	DatabaseBackupIcon,
	ExternalLink,
	LayoutDashboard,
	PackagePlus,
} from 'lucide-react';

export type NavRouteType = {
	permissions: String[]; // permission title, not ID
	isAdmin?: boolean; // if true, disregard permissions and show only for admin
	navProps: {
		path: string;
		displayText: string;
		icon: JSX.Element;
	};
};

export const NavRoutes: NavRouteType[] = [
	{
		permissions: [''],
		isAdmin: true,
		navProps: {
			path: '/dashboard',
			displayText: 'Dashboard',
			icon: <LayoutDashboard className="h-10 w-10 text-[#CCCCCC]" />,
		},
	},
	{
		permissions: ['view_pos_page'],
		navProps: {
			path: '/pos/add-order',
			displayText: 'Add Order',
			icon: <Banknote className="h-10 w-10 text-[#CCCCCC]" />,
		},
	},
	{
		permissions: ['add_product', 'view_products_page'],
		navProps: {
			path: '/pos/add-product',
			displayText: 'Add Product',
			icon: <PackagePlus className="h-10 w-10 text-[#CCCCCC]" />,
		},
	},
	{
		permissions: ['view_returns_page'],
		navProps: {
			path: '/pos/return-items',
			displayText: 'Return Items',
			icon: <DatabaseBackupIcon className="h-10 w-10 text-[#CCCCCC]" />,
		},
	},
	{
		permissions: ['view_transfers_page', 'add_transfer'],
		navProps: {
			path: '/pos/transfer',
			displayText: 'Transfers',
			icon: <ExternalLink className="h-10 w-10 text-[#CCCCCC]" />,
		},
	},
];
