import { SidebarListItems } from '../types';
import {
	CircleUserRound,
	Clock,
	ArrowRightLeft,
	ExternalLink,
	Undo2,
	ClipboardList,
	Banknote,
	BarChartBig,
	Warehouse,
	Truck,
	Boxes,
} from 'lucide-react';

export type Role =
	| 'super_admin'
	| 'admin'
	| 'manager'
	| 'encoder'
	| 'sales_person';

interface SidebarGroup {
	groupName?: string;
	items: SidebarListItems[];
}

export const SidebarRoutesGrouped: SidebarGroup[] = [
	{
		groupName: 'Operations',
		items: [
			{
				id: 'pendings',
				allowedRoles: ['super_admin', 'admin', 'manager'],
				itemProps: {
					title: 'Pendings',
					icon: <Clock size={20} strokeWidth={1.75} />,
				},
				children: [
					{
						id: 'pending-inventory',
						allowedRoles: ['super_admin', 'admin', 'manager'],
						path: '/pending/inventory',
						itemProps: {
							title: 'Pending Inventory',
						},
					},
					{
						id: 'pending-transfer',
						allowedRoles: ['super_admin', 'admin', 'manager'],
						path: '/pending/transfer',
						itemProps: {
							title: 'Pending Transfer',
						},
					},
					{
						id: 'pending-return',
						allowedRoles: ['super_admin', 'admin', 'manager'],
						path: '/pending/return',
						itemProps: {
							title: 'Pending Return',
						},
					},
				],
			},
			{
				id: 'transactions',
				allowedRoles: [
					'super_admin',
					'admin',
					'manager',
					'encoder',
					'sales_person',
				],
				itemProps: {
					title: 'Transactions',
					icon: <ArrowRightLeft size={20} strokeWidth={1.75} />,
				},
				children: [
					{
						id: 'transaction',
						allowedRoles: [
							'super_admin',
							'admin',
							'manager',
							'encoder',
							'sales_person',
						],
						path: '/transaction',
						itemProps: {
							title: 'Transaction',
						},
					},
					{
						id: 'transaction-return',
						allowedRoles: [
							'super_admin',
							'admin',
							'manager',
							'encoder',
							'sales_person',
						],
						path: '/transaction/return',
						itemProps: {
							title: 'Transaction Return',
						},
					},
				],
			},
			{
				id: 'inventories',
				allowedRoles: ['super_admin', 'admin', 'manager', 'encoder'],
				path: '/inventory',
				itemProps: {
					title: 'Inventories',
					icon: <ClipboardList size={20} strokeWidth={1.75} />,
				},
			},
			{
				id: 'transfers',
				allowedRoles: ['super_admin', 'admin', 'manager', 'encoder'],
				path: '/transfer',
				itemProps: {
					title: 'Transfers',
					icon: <ExternalLink size={20} strokeWidth={1.75} />,
				},
			},
			{
				id: 'returns',
				allowedRoles: [
					'super_admin',
					'admin',
					'manager',
					'encoder',
					'sales_person',
				],
				path: '/returns',
				itemProps: {
					title: 'Returns',
					icon: <Undo2 size={20} strokeWidth={1.75} />,
				},
			},
		],
	},
	{
		groupName: 'Management',
		items: [
			{
				id: 'users',
				allowedRoles: ['super_admin', 'admin', 'manager'],
				itemProps: {
					title: 'Users',
					icon: <CircleUserRound size={20} strokeWidth={1.75} />,
				},
				children: [
					{
						id: 'user-information',
						allowedRoles: ['super_admin', 'admin', 'manager'],
						path: '/user/information',
						itemProps: {
							title: 'User Information',
						},
					},
					{
						id: 'user-sales',
						allowedRoles: ['super_admin', 'admin', 'manager'],
						path: '/user/sales',
						itemProps: {
							title: 'User Sales',
						},
					},
				],
			},
			{
				id: 'finances',
				allowedRoles: ['super_admin', 'admin', 'manager'],
				path: '/finance',
				itemProps: {
					title: 'Finances',
					icon: <Banknote size={20} strokeWidth={1.75} />,
				},
			},
			{
				id: 'reports',
				allowedRoles: ['super_admin', 'admin', 'manager'],
				path: '/reports',
				itemProps: {
					title: 'Reports',
					icon: <BarChartBig size={20} strokeWidth={1.75} />,
				},
			},
			{
				id: 'warehouses',
				allowedRoles: ['super_admin', 'admin'],
				path: '/warehouse',
				itemProps: {
					title: 'Warehouses',
					icon: <Warehouse size={20} strokeWidth={1.75} />,
				},
			},
			{
				id: 'suppliers',
				allowedRoles: ['super_admin', 'admin'],
				path: '/supplier',
				itemProps: {
					title: 'Suppliers',
					icon: <Truck size={20} strokeWidth={1.75} />,
				},
			},
			{
				id: 'products',
				allowedRoles: ['super_admin', 'admin'],
				itemProps: {
					title: 'Products',
					icon: <Boxes size={20} strokeWidth={1.75} />,
				},
				children: [
					{
						id: 'product-items',
						allowedRoles: ['super_admin', 'admin'],
						path: '/products',
						itemProps: {
							title: 'Product Items',
						},
					},
					{
						id: 'product-listings',
						allowedRoles: ['super_admin', 'admin'],
						path: '/products/listings',
						itemProps: {
							title: 'Product Listings',
						},
					},
				],
			},
		],
	},
];
