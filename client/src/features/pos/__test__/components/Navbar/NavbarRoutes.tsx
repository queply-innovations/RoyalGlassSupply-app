import { Banknote, PackagePlus, ScrollText } from 'lucide-react';
import { NavbarRoute } from '../../types';

export const NavbarRoutes: NavbarRoute[] = [
	{
		allowedRoles: ['super_admin', 'admin', 'manager'],
		navbarProps: {
			displayText: 'Add Order',
			icon: <Banknote className="h-10 w-10 text-[#CCCCCC]" />,
		},
		path: '/pos/add-order',
	},
	{
		allowedRoles: ['super_admin', 'admin', 'manager'],
		navbarProps: {
			displayText: 'Add Product',
			icon: <PackagePlus className="h-10 w-10 text-[#CCCCCC]" />,
		},
		path: '/pos/add-product',
	},
	{
		allowedRoles: ['super_admin', 'admin', 'manager'],
		navbarProps: {
			displayText: 'Add Invoice',
			icon: <ScrollText className="h-10 w-10 text-[#CCCCCC]" />,
		},
		path: '/pos/add-invoice',
	},
];
