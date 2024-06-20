import {
	Banknote,
	DatabaseBackupIcon,
	LayoutDashboard,
	PackagePlus,
	ClipboardList,
} from 'lucide-react';
import { NavbarRoute } from '../../types';

export const NavbarRoutes: NavbarRoute[] = [
	{
		allowedRoles: ['super_admin', 'admin', 'manager'],
		navbarProps: {
			displayText: 'Dashboard',
			icon: <LayoutDashboard className="h-10 w-10 text-[#CCCCCC]" />,
		},
		path: '/dashboard',
	},
	{
		allowedRoles: [
			'super_admin',
			'admin',
			'manager',
			'encoder',
			'sales_person',
		],
		navbarProps: {
			displayText: 'Add Order',
			icon: <Banknote className="h-10 w-10 text-[#CCCCCC]" />,
		},
		path: '/pos/add-order',
	},
	{
		allowedRoles: [
			'super_admin',
			'admin',
			'manager',
			'encoder',
			'sales_person',
		],
		navbarProps: {
			displayText: 'Add Product',
			icon: <PackagePlus className="h-10 w-10 text-[#CCCCCC]" />,
		},
		path: '/pos/add-product',
	},
	{
		allowedRoles: [
			'super_admin',
			'admin',
			'manager',
			'encoder',
			'sales_person',
		],
		navbarProps: {
			displayText: 'Return Items',
			icon: <DatabaseBackupIcon className="h-10 w-10 text-[#CCCCCC]" />,
		},
		path: '/pos/return-items',
	},
	// {
	// 	allowedRoles: ['super_admin', 'admin', 'manager'],
	// 	navbarProps: {
	// 		displayText: 'Pending Invoices',
	// 		icon: <ClipboardList className="h-10 w-10 text-[#CCCCCC]" />,
	// 	},
	// 	path: '/pos/pending-invoices',
	// },
];
